"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const aspectClasses = [
    "aspect-[3/4]",
    "aspect-[4/3]",
    "aspect-square",
    "aspect-[2/3]",
    "aspect-[5/7]",
  ];
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="relative w-full">
      <div className="columns-2 gap-3 md:gap-4 bg-card [column-fill:_balance]">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="break-inside-avoid rounded-lg bg-card"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative w-full overflow-hidden rounded-lg ${
                aspectClasses[index % aspectClasses.length]
              }`}
              aria-label={`Open ${title} image ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${title} image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 80vw, 520px"
                className="object-cover border border-primary/30 rounded-lg"
                priority={index === 0}
              />
            </button>
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
      {activeImage ? (
        mounted
          ? createPortal(
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`${title} image ${activeIndex! + 1}`}
                className="fixed inset-0 z-[60] w-full flex items-center justify-center bg-black/80 p-4"
                onClick={() => setActiveIndex(null)}
              >
                <div
                  className="relative max-h-[90vh] w-full max-w-5xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className="fixed right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white transition hover:border-white"
                    aria-label="Close full image"
                  >
                    ✕
                  </button>
                  <div className="relative h-[90vh] w-full">
                    <Image
                      src={activeImage}
                      alt={`${title} image ${activeIndex! + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>,
              document.body
            )
          : null
      ) : null}
    </div>
  );
}
