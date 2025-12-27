"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import ProjectGallery from "@/components/project-gallery";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const focusableSelector =
  "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return [] as HTMLElement[];
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
}

const modalTransitionMs = 220;

export default function ProjectCard({ title, description, images }: Project) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [transformFrom, setTransformFrom] = useState({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  });
  const titleId = useId();
  const cardRef = useRef<HTMLButtonElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const openModal = () => {
    cardRectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    window.setTimeout(() => setIsOpen(false), modalTransitionMs);
  };

  useLayoutEffect(() => {
    if (!isOpen) return;

    const cardRect = cardRectRef.current;
    const modalRect = modalRef.current?.getBoundingClientRect();
    if (!modalRect || !cardRect) {
      setIsVisible(true);
      return;
    }

    const targetCenterX = modalRect.left + modalRect.width / 2;
    const targetCenterY = modalRect.top + modalRect.height / 2;
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    setTransformFrom({
      x: cardCenterX - targetCenterX,
      y: cardCenterY - targetCenterY,
      scaleX: cardRect.width / modalRect.width,
      scaleY: cardRect.height / modalRect.height,
    });

    requestAnimationFrame(() => setIsVisible(true));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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

    const focusable = getFocusableElements(modalRef.current);
    (closeButtonRef.current || focusable[0])?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={cardRef}
        type="button"
        onClick={openModal}
        className="group relative isolate w-full text-left mt-8 mb-4 transition duration-300 hover:-translate-y-1 hover:border-neutral-300"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="absolute left-6 top-2 z-10 h-10 w-[calc(100%-3rem)] -translate-y-full overflow-hidden">
          <div className="flex items-end">
            {images.slice(0, 5).map((src, index) => (
              <div
                key={`${src}-${index}`}
                className={cn("relative h-16 w-20 overflow-hidden rounded-sm text-card-foreground bg-primary",
                  index === 0 ? "" : "-ml-4",
                )}
                style={{ zIndex: images.length - index }}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span
                  className="absolute inset-0"
                  style={{ backgroundColor: `rgba(0, 0, 0, ${index * 0.12})` }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 -top-4 z-0 h-full rounded-3xl border border-neutral-200 dark:text-card-foreground text-black dark:bg-primary bg-card shadow-sm" />
        <div className="relative z-20 flex h-full flex-col justify-between rounded-3xl border dark:text-card-foreground text-black dark:bg-primary bg-card border-neutral-200 p-6 pt-10 shadow-sm">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold tracking-tight text-primary dark:text-black">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-end text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/15 dark:border-black/10 text-xs text-primary dark:text-black transition group-hover:border-primary/30 dark:group-hover:border-black/30">
              →
            </span>
          </div>
        </div>
      </button>

      {isOpen ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity duration-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl transition-[transform] duration-200 md:p-8"
            style={{
              transform: isVisible
                ? "translate(0px, 0px) scale(1, 1)"
                : `translate(${transformFrom.x}px, ${transformFrom.y}px) scale(${transformFrom.scaleX}, ${transformFrom.scaleY})`,
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
              aria-label="Close project gallery"
            >
              ✕
            </button>

            <div className="grid gap-6 lg:grid-cols-12">
              <div className="col-span-8 flex items-center justify-center">
                <ProjectGallery images={images} title={title} />
              </div>
              <div className="space-y-4 lg:col-span-4 lg:col-start-9">
                <h3
                  id={titleId}
                  className="text-2xl font-semibold text-neutral-900"
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {description}
                </p>
                <p className="text-xs uppercase text-neutral-400">
                  Use arrow keys or swipe to navigate
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
