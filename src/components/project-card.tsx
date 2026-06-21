"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ProjectGallery from "@/components/project-gallery";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Github } from "lucide-react";

const focusableSelector =
  "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return [] as HTMLElement[];
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
}

const modalTransitionMs = 240;

type ProjectCardLayout = "grid" | "square";

type ProjectCardProps = Project & {
  interactive?: boolean;
};

export default function ProjectCard({
  title,
  description,
  images,
  githubUrl,
  interactive = true,
}: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledGallery, setHasScrolledGallery] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const titleId = useId();
  const modalTitleId = `${titleId}-modal`;
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = () => {
    if (!interactive) return;
    setIsVisible(false);
    setHasScrolledGallery(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    window.setTimeout(() => setIsOpen(false), modalTransitionMs);
  };

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const preventScroll = (event: Event) => {
      if (modalRef.current?.contains(event.target as Node)) return;
      event.preventDefault();
    };
    const preventKeys = (event: KeyboardEvent) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];
      if (!keys.includes(event.key)) return;
      if (modalRef.current?.contains(event.target as Node)) return;
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(modalRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("keydown", preventKeys);

    const focusable = getFocusableElements(modalRef.current);
    (closeButtonRef.current || focusable[0])?.focus();

    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("keydown", preventKeys);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
      const previous = previouslyFocusedRef.current;
      if (previous) {
        try {
          previous.focus({ preventScroll: true });
        } catch {
          previous.focus();
        }
      }
    };
  }, [isOpen]);

  return (
    <>
      <div className="relative">
        <div
          ref={cardRef}
          role={interactive ? "button" : "group"}
          tabIndex={interactive ? 0 : -1}
          onClick={() => {
            if (!interactive) return;
            if (!isOpen) openModal();
          }}
          onKeyDown={(event) => {
            if (!interactive || isOpen) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openModal();
            }
          }}
          aria-haspopup={interactive ? "dialog" : undefined}
          aria-expanded={interactive ? isOpen || undefined : undefined}
          aria-labelledby={titleId}
          className={cn(
            "group isolate w-full text-left transition-[transform,opacity] duration-300 ease-out outline-none focus-visible:outline-none focus-visible:ring-0",
            cn(
              "relative w-full overflow-visible group-hover:-translate-y-2 min-h-60"
            )
          )}
        >
          <>
            <div className="absolute left-6 top-[76px] z-10 h-24 w-[calc(100%-3rem)] -translate-y-full overflow-visible">
              <div className="flex items-end overflow-visible">
                {images.slice(0, 5).map((image, index) => (
                  <div
                    key={`${image.src}-${index}`}
                    className={cn(
                      "relative h-20 w-25 overflow-hidden rounded-sm text-card-foreground bg-primary transition-transform duration-300 ease-out group-hover:[transform:translateY(var(--lift))_rotate(var(--rot))]",
                      index === 0 ? "" : "-ml-4"
                    )}
                    style={{
                      zIndex: images.length - index,
                      ["--lift" as string]: `-${10 + index * 6}px`,
                      ["--rot" as string]: `${index * 8 - 16}deg`,
                    }}
                  >
                    <img
                      src={image.src}
                      alt={`${title} - ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <span
                      className="absolute inset-0"
                      style={{
                        backgroundColor: `rgba(0, 0, 0, ${index * 0.12})`,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 -top-4 z-0 h-full rounded-3xl bg-primary opacity-10 dark:bg-slate-900 border border-neutral-200 text-black shadow-sm" />
            <div className="relative min-h-fit md:min-h-auto z-20 flex h-60 flex-col justify-between rounded-3xl border text-black bg-card border-neutral-200 dark:border-neutral-700 p-10 shadow-sm hover:translate-y-2 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-none">
              <div className="space-y-6">
                <h3
                  id={titleId}
                  className="select-none text-2xl font-semibold tracking-tight text-primary dark:text-white"
                >
                  {title}
                </h3>
                <p className="select-none text-sm text-neutral-600 dark:text-gray-300 max-w-[60%]">
                  {description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-end text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-300">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/15 dark:border-white/30 dark:text-white/70 text-xs text-primary dark:text-black transition group-hover:border-primary/30 dark:group-hover:border-white/50">
                  →
                </span>
              </div>
            </div>
          </>
        </div>
      </div>

      {isOpen && isMounted
        ? createPortal(
            <>
              <div
                className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-200 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                onClick={closeModal}
                aria-hidden="true"
              />
              <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={modalTitleId}
                className={cn(
                  "fixed left-1/2 bottom-0 z-50 h-[min(85vh,90rem)] w-[min(85vw,100rem)] -translate-x-1/2 rounded-t-[2.5rem] rounded-b-none border border-neutral-200 dark:border-neutral-600 bg-card p-6 shadow-2xl transition-transform duration-300 ease-out md:p-10",
                  isVisible ? "translate-y-0" : "translate-y-full"
                )}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 dark:text-neutral-200 transition hover:border-neutral-400 dark:hover:text-neutral-400 hover:text-neutral-900"
                  aria-label="Close project gallery"
                >
                  ✕
                </button>
                <div className="grid h-full min-h-0 gap-6 lg:grid-cols-12 items-start lg:h-full">
                  <div className="order-2 col-span-full lg:order-1 lg:col-span-8 flex h-full min-h-0 items-start justify-center rounded-lg">
                    <div
                      className="h-full min-h-0 w-full max-w-4xl overflow-y-auto rounded-lg [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      onScroll={() => {
                        if (!hasScrolledGallery) setHasScrolledGallery(true);
                      }}
                    >
                      <ProjectGallery
                        images={images}
                        title={title}
                        showScrollHint={!hasScrolledGallery}
                      />
                    </div>
                  </div>
                  <div className="order-1 space-y-4 col-span-full lg:order-2 lg:col-span-4 lg:col-start-9">
                    <h3
                      id={modalTitleId}
                      className="text-2xl font-semibold text-neutral-900 dark:text-white"
                    >
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                      {description}
                    </p>
                    <p className="items-center py-2 text-sm text-primary">
                      Try clicking on the images to view them in full!
                    </p>
                    {githubUrl ? (
                      <Link
                        href={githubUrl}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm underline-animate"
                      >
                        <Github className="h-4 w-4" />
                        View on GitHub
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </>,
            document.body
          )
        : null}
    </>
  );
}
