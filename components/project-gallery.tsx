"use client";

import Image from "next/image";

type ProjectGalleryProps = {
  images: string[];
  title: string;
  showScrollHint?: boolean;
};

export default function ProjectGallery({
  images,
  title,
  showScrollHint = true,
}: ProjectGalleryProps) {
  const aspectClasses = [
    "aspect-[3/4]",
    "aspect-[4/3]",
    "aspect-square",
    "aspect-[2/3]",
    "aspect-[5/7]",
  ];

  return (
    <div className="relative w-full max-w-2xl">
      <div className="columns-2 gap-3 [column-fill:_balance] md:gap-4">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="mb-3 break-inside-avoid rounded-2xl bg-neutral-100 md:mb-4"
          >
            <div
              className={`relative w-full overflow-hidden rounded-lg ${
                aspectClasses[index % aspectClasses.length]
              }`}
            >
              <Image
                src={src}
                alt={`${title} image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 80vw, 520px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={`pointer-events-none sticky bottom-0 left-0 flex w-full justify-center pb-2 transition-all duration-300 ${
          showScrollHint
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
        aria-hidden={!showScrollHint}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:text-white bg-white/50 text-neutral-500 shadow-sm backdrop-blur-sm animate-bounce">
          ↓
        </div>
      </div>
    </div>
  );
}
