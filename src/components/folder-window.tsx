'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';
import { aboutContent } from '@/lib/content/about';
import BackIcon from '../../public/images/previous-icon.svg?component';
import NextIcon from '../../public/images/next-icon.svg?component';
import PlayIcon from '../../public/images/play-icon.svg?component';

const clothes = [
  { src: '/images/clothes/shirt-1.png', alt: 'Blue printed top', type: 'top' },
  {
    src: '/images/clothes/shirt-2.png',
    alt: 'Brown one-shoulder top',
    type: 'top',
  },
  { src: '/images/clothes/shirt-3.png', alt: 'Brazil jersey top', type: 'top' },
  { src: '/images/clothes/pants-2.png', alt: 'Blue jeans', type: 'bottom' },
  { src: '/images/clothes/pants-3.png', alt: 'Dark skirt', type: 'bottom' },
] as const;

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

  useEffect(() => {
    document.querySelectorAll('span').forEach(span => {
      if (span.textContent.includes('sofia.hernandes@macbook-pro ~')) {
        span.style.color = 'blue';
      }
    });
  }, []);

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

      <div className="mx-auto grid h-full max-w-full grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden px-14 py-4 md:min-h-0 md:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] md:grid-rows-[minmax(0,1fr)] md:gap-8 md:overflow-hidden md:px-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-10">
        <article className="min-h-0 space-y-3 self-center md:flex md:flex-col md:overflow-hidden md:self-stretch">
          <h2 className="text-3xl font-extrabold text-balance">
            {aboutContent.title}
          </h2>

          <div className="min-h-0 space-y-5 overflow-y-auto text-sm text-[#352924] md:flex-1 scrollbar-none">
            <p key={aboutContent.content} className="text-pretty">
              {aboutContent.content}
            </p>
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
              {selectedClothes.top && (
                <div className="absolute inset-x-0 top-[18%] h-[28%]">
                  <Image
                    src={selectedClothes.top}
                    alt="Selected top clothing"
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-contain object-bottom"
                  />
                </div>
              )}
              {selectedClothes.bottom && (
                <div className="absolute inset-x-0 top-[44%] h-[59%] mr-1">
                  <Image
                    src={selectedClothes.bottom}
                    alt="Selected bottom clothing"
                    fill
                    className="object-contain object-bottom"
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
                    className={`group rounded-sm p-2 ${
                      selected ? 'glass-highlight hover:glass' : 'glass hover:glass-highlight'
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="relative mx-auto aspect-[5/3] w-full max-w-[9rem]">
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
