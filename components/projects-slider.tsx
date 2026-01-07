"use client";

import * as React from "react";
import ProjectCard from "@/components/project-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectsSliderProps = {
  projects: Project[];
};

function getDistance(index: number, current: number) {
  return index - current;
}

function getSlideStyle(distance: number) {
  const abs = Math.abs(distance);
  const scaleX = abs === 0 ? 1 : abs === 1 ? 0.9 : 0.82;
  const scaleY = abs === 0 ? 1 : abs === 1 ? 0.96 : 0.88;
  const rotate = abs === 0 ? 0 : distance * 6;
  const curve = abs === 0 ? 0 : distance * -18;
  const lift = abs === 0 ? 0 : abs === 1 ? 32 : 44;
  const depth = abs === 0 ? 0 : abs === 1 ? -80 : -140;

  return {
    transform: `translateY(${lift}px) rotate(${rotate}deg) rotateY(${curve}deg) translateZ(${depth}px) scaleX(${scaleX}) scaleY(${scaleY})`,
    zIndex: 10 - abs,
  } as const;
}

export default function ProjectsSlider({
  projects,
}: ProjectsSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isInView, setIsInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const slides = React.useMemo(
    () => [...projects, ...projects, ...projects],
    [projects]
  );
  const initialSlide = projects.length;

  React.useEffect(() => {
    if (!api) return;
    api.scrollTo(initialSlide, true);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api, initialSlide]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleArrowKey = React.useCallback(
    (event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) => {
      if (!api) return false;
      const active = document.activeElement;
      const container = containerRef.current;
      const dialog = document.querySelector<HTMLElement>(
        "[role='dialog'][aria-modal='true']"
      );
      if (dialog && active instanceof HTMLElement && dialog.contains(active)) {
        return false;
      }

      const isActive =
        isInView ||
        (container &&
          active instanceof HTMLElement &&
          container.contains(active));
      if (!isActive) return false;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        api.scrollPrev();
        return true;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        api.scrollNext();
        return true;
      }

      return false;
    },
    [api, isInView]
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleArrowKey(event);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleArrowKey]);

  return (
    <Carousel
      ref={containerRef}
      setApi={setApi}
      opts={{ loop: false, align: "center" }}
      tabIndex={0}
      aria-label="Projects carousel"
      className="projects-carousel overflow-visible! focus-visible:outline-none focus-visible:ring-0"
      onKeyDownCapture={(event) => {
        if (handleArrowKey(event)) {
          event.stopPropagation();
        }
      }}
    >
      <CarouselContent className="items-stretch py-8 overflow-visible!">
        {slides.map((project, index) => {
          const distance = getDistance(index, current);
          const isActive = distance === 0;

          return (
            <CarouselItem
              key={`${project.title}-${index}`}
              className={cn(
                "basis-[70%] md:basis-[70%] lg:basis-[60%] px-2 transition-[transform,opacity] duration-300 ease-out cursor-grab active:cursor-grabbing"
              )}
              style={getSlideStyle(distance)}
              onClick={() => {
                if (!isActive) api?.scrollTo(index);
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                images={project.images}
                githubUrl={project.githubUrl}
                interactive={isActive}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
