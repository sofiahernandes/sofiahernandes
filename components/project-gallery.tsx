"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import { useEffect } from "react";
import { useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  return (
    <Swiper
      effect="cards"
      grabCursor
      modules={[EffectCards, Keyboard]}
      keyboard={{ enabled: true, onlyInViewport: false }}
      onInit={(swiper) => {
        const wrapper = swiper.wrapperEl as HTMLElement | null;
        if (!wrapper) return;
        const previousDuration = wrapper.style.transitionDuration;
        wrapper.style.transitionDuration = "0ms";
        requestAnimationFrame(() => {
          wrapper.style.transitionDuration = previousDuration;
        });
      }}
      className="w-3/4 max-w-sm"
    >
      {images.map((src, index) => (
        <SwiperSlide key={`${src}-${index}`} className="rounded-2xl">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={src}
              alt={`${title} slide ${index + 1}`}
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-contain"
              priority={index === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
