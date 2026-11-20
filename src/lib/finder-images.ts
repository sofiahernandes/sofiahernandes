'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export interface FinderImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const IMAGE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.avif',
  '.svg',
]);

async function readImagesFromDir(
  dirPath: string,
  urlPrefix: string,
): Promise<FinderImage[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
      )
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const images = await Promise.all(
      files.map(async (fileName) => {
        const fullPath = path.join(dirPath, fileName);
        let width = 1200;
        let height = 900;

        try {
          const metadata = await sharp(fullPath).metadata();
          if (metadata.width && metadata.height) {
            width = metadata.width;
            height = metadata.height;
          }
        } catch {
          // Use fallback dimensions if metadata cannot be read
        }

        const baseName = path.basename(fileName, path.extname(fileName));

        return {
          src: `${urlPrefix}/${fileName}`,
          alt: baseName,
          width,
          height,
        };
      }),
    );

    return images;
  } catch {
    return [];
  }
}

export async function getFinderImages(): Promise<FinderImage[]> {
  const publicDir = path.join(process.cwd(), 'public');

  const [imagesFinder, rootFinder] = await Promise.all([
    readImagesFromDir(
      path.join(publicDir, 'images', 'finder'),
      '/images/finder',
    ),
    readImagesFromDir(path.join(publicDir, 'finder'), '/finder'),
  ]);

  return [...imagesFinder, ...rootFinder];
}
