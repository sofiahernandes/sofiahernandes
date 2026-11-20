'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  DEFAULT_FINDER_IMAGES,
  type FinderImage,
} from '@/lib/content/finder-images';
import { getFinderImages } from '@/lib/finder-images';

const SKELETON_COLUMNS: [string[], string[]] = [
  ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]'],
  ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/3]'],
];

let cachedFinderImages: FinderImage[] | null = null;

function filterFinderImages(
  images: FinderImage[],
  selectedFilter: string,
): FinderImage[] {
  switch (selectedFilter) {
    case 'old':
      return images.filter((image) => image.src.includes('finder-old-images'));
    case 'new':
      return images.filter((image) => image.src.includes('finder-new-images'));
    case 'all':
    default:
      return images;
  }
}

function distributeIntoTwoColumns(
  images: FinderImage[],
): [FinderImage[], FinderImage[]] {
  const columns: [FinderImage[], FinderImage[]] = [[], []];
  const heights: [number, number] = [0, 0];
  const breaks: [number[], number[]] = [[], []];
  const remaining = [...images];

  while (remaining.length > 0) {
    const targetCol = heights[0] <= heights[1] ? 0 : 1;
    const otherCol = targetCol === 0 ? 1 : 0;
    const currentHeight = heights[targetCol];
    const otherBreaks = breaks[otherCol];

    let pickIndex = remaining.findIndex((img) => {
      const relHeight = img.height / img.width;
      const nextBreak = currentHeight + relHeight;
      return !otherBreaks.some((b) => Math.abs(b - nextBreak) < 0.01);
    });

    if (pickIndex === -1) {
      pickIndex = 0;
    }

    const [picked] = remaining.splice(pickIndex, 1);
    const relHeight = picked.height / picked.width;

    columns[targetCol].push(picked);
    heights[targetCol] += relHeight;
    breaks[targetCol].push(heights[targetCol]);
  }

  return columns;
}

function FinderImageCard({ image }: { image: FinderImage }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-sm"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      {!loaded && (
        <div
          aria-hidden="true"
          className="finder-skeleton absolute inset-0 rounded-xl"
        />
      )}
      <Image
        src={image.src}
        alt={image.alt || 'Sofia Botechia Hernandes gallery photo'}
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 45vw, 340px"
        onLoad={() => setLoaded(true)}
        className={`block h-full w-full object-cover transition-opacity duration-200 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </figure>
  );
}

export default function Finder() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [images, setImages] = useState<FinderImage[] | null>(
    cachedFinderImages,
  );

  useEffect(() => {
    let cancelled = false;

    getFinderImages()
      .then((loaded) => {
        if (!cancelled) {
          const baseImages =
            loaded.length > 0 ? loaded : DEFAULT_FINDER_IMAGES;
          const filtered = filterFinderImages(baseImages, selectedFilter);
          cachedFinderImages = filtered;
          setImages(filtered);
        }
      })
      .catch(() => {
        if (!cancelled) {
          const filtered = filterFinderImages(
            DEFAULT_FINDER_IMAGES,
            selectedFilter,
          );
          cachedFinderImages = filtered;
          setImages(filtered);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedFilter]);

  const [leftColumn, rightColumn] = useMemo(
    () => (images ? distributeIntoTwoColumns(images) : [[], []]),
    [images],
  );

  return (
    <div className="h-full w-full overflow-y-auto bg-white p-3">
      {/*
      <div className="w-full mb-2">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-2 py-1 text-sm rounded-sm base-select"
        >
          <option value="all" className="px-2 text-sm font-rethink">
            All Media
          </option>
          <option value="old" className="px-2 text-sm font-rethink">
            Old Images
          </option>
          <option value="new" className="px-2 text-sm font-rethink">
            New Images
          </option>
        </select>
      </div>
      */}

      {images === null ? (
        <div
          aria-busy="true"
          aria-label="Loading gallery"
          className="grid grid-cols-2 items-start gap-3"
        >
          {SKELETON_COLUMNS.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {column.map((aspectClass, index) => (
                <div
                  key={index}
                  className={`finder-skeleton w-full rounded-xl ${aspectClass}`}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 items-start gap-3">
          {[leftColumn, rightColumn].map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {column.map((image) => (
                <FinderImageCard key={image.src} image={image} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
