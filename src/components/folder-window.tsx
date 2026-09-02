'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { aboutContent } from '@/lib/content/about';
import BackIcon from '../../public/images/previous-icon.svg?component';
import NextIcon from '../../public/images/next-icon.svg?component';
import PlayIcon from '../../public/images/play-icon.svg?component';

const clothes = [
  { src: '/images/clothes/shirt-1.png', alt: 'Blue printed top', type: 'top', width: 251, height: 362 },
  {
    src: '/images/clothes/shirt-2.png',
    alt: 'Brown one-shoulder top',
    type: 'top',
    width: 201,
    height: 334,
  },
  { src: '/images/clothes/shirt-3.png', alt: 'Brazil jersey top', type: 'top', width: 320, height: 374 },
  { src: '/images/clothes/pants-1.png', alt: 'Blue jeans', type: 'bottom', width: 325, height: 839 },
  { src: '/images/clothes/pants-2.png', alt: 'Dark skirt', type: 'bottom', width: 491, height: 864 },
];

type ClothingType = (typeof clothes)[number]['type'];
type SelectedClothes = Record<ClothingType, string | null>;

function AboutFolderWindow() {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedClothes, setSelectedClothes] = useState<SelectedClothes>({
    top: '/images/clothes/shirt-2.png',
    bottom: '/images/clothes/pants-2.png',
  });

  const visibleClothes = useMemo(
    () =>
      Array.from(
        { length: 3 },
        (_, offset) => clothes[(startIndex + offset) % clothes.length],
      ),
    [startIndex],
  );

  const cycleClothes = (direction: 1 | -1) => {
    setStartIndex(
      (current) => (current + direction + clothes.length) % clothes.length,
    );
  };

  const setClothing = (type: ClothingType, src: string | null) => {
    setSelectedClothes((current) => ({
      ...current,
      [type]: src,
    }));
  };

  const selectedTop = clothes.find((item) => item.src === selectedClothes.top);
  const selectedBottom = clothes.find(
    (item) => item.src === selectedClothes.bottom,
  );

  return (
    <section className="relative h-full overflow-hidden bg-[#f7f3f0]">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20">
        <Image
          src="/images/border.png"
          alt=""
          fill
          sizes="80px"
          className="object-cover object-left"
        />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20">
        <Image
          src="/images/border.png"
          alt=""
          fill
          sizes="80px"
          className="object-cover object-right"
        />
      </div>

      <div className="mx-auto grid h-full max-w-full grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden px-14 py-4 md:min-h-0 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,1.2fr)] md:grid-rows-[minmax(0,1fr)] md:gap-8 md:overflow-hidden md:px-24">
        <article className="min-h-0 space-y-3 self-center md:flex md:flex-col md:overflow-hidden md:self-stretch">
          <h2 className="text-3xl font-extrabold text-balance">
            {aboutContent.title}
          </h2>

          <div className="relative min-h-0 md:flex-1">
            <div className="scrollbar-none h-full overflow-y-auto text-sm text-[#352924]">
              <p key={aboutContent.content} className="text-pretty my-3">
                {aboutContent.content}
              </p>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-[#f7f3f0] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#f7f3f0] to-transparent" />
          </div>
        </article>

        <aside className="relative h-full overflow-hidden rounded-sm bg-[#D8C8BF]">
          <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
            <div className="relative h-full aspect-[382/1300] origin-bottom scale-[0.95]">
              <Image
                src="/images/character.png"
                alt="Illustrated character to dress up"
                fill
                className="object-contain"
                priority
              />
              {selectedTop && (
                <div className="absolute left-1/2 top-[18%] h-[28%] -translate-x-1/2">
                  <Image
                    src={selectedTop.src}
                    alt="Selected top clothing"
                    width={selectedTop.width}
                    height={selectedTop.height}
                    className="h-full w-auto max-w-none object-contain"
                  />
                </div>
              )}
              {selectedBottom && (
                <div className="absolute left-1/2 top-[44%] h-[59%] -translate-x-1/2">
                  <Image
                    src={selectedBottom.src}
                    alt="Selected bottom clothing"
                    width={selectedBottom.width}
                    height={selectedBottom.height}
                    className="h-full w-auto max-w-none object-contain mr-[0.3rem]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-x-2 bottom-2 z-10 grid gap-2">
            <div className="grid grid-cols-3 gap-1.5">
              {visibleClothes.map((item) => {
                const selected = selectedClothes[item.type] === item.src;

                return (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setClothing(item.type, item.src)}
                    className={`group rounded-sm p-1 ${
                      selected ? 'glass-highlight hover:glass' : 'glass hover:glass-highlight'
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="relative mx-auto aspect-[5/3.5] w-full max-w-[9rem]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 1024px) 25vw, 12vw"
                        className="object-contain"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => cycleClothes(-1)}
                className="flex justify-center items-center glass hover:glass-highlight rounded-sm px-4 py-2"
                aria-label="Show previous clothes"
              >
                <BackIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setClothing(
                    visibleClothes[1].type,
                    visibleClothes[1].src,
                  )
                }
                className="flex justify-center items-center glass hover:glass-highlight rounded-sm px-4 py-2"
              >
                <PlayIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => cycleClothes(1)}
                className="flex justify-center items-center glass hover:glass-highlight rounded-sm px-4 py-2"
                aria-label="Show next clothes"
              >
                <NextIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function FolderWindow({ title }: { title?: string }) {
  if (title === 'About') return <AboutFolderWindow />;

  return <div className="h-full w-full bg-white p-5 text-sm" />;
}
