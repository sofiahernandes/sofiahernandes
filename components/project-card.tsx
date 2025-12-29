"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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

export default function ProjectCard({
  title,
  description,
  images,
  githubUrl,
}: Project) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledGallery, setHasScrolledGallery] = useState(false);
  const [transformFrom, setTransformFrom] = useState({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  });
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const openModal = () => {
    cardRectRef.current = panelRef.current?.getBoundingClientRect() ?? null;
    setIsVisible(false);
    setHasScrolledGallery(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    window.setTimeout(() => setIsOpen(false), modalTransitionMs);
  };

  useLayoutEffect(() => {
    if (!isOpen) return;

    const cardRect = cardRectRef.current;
    const modalRect = panelRef.current?.getBoundingClientRect();
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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const preventScroll = (event: Event) => {
      if (panelRef.current?.contains(event.target as Node)) return;
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
      if (panelRef.current?.contains(event.target as Node)) return;
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(panelRef.current);
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

    const focusable = getFocusableElements(panelRef.current);
    (closeButtonRef.current || focusable[0])?.focus();

    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("keydown", preventKeys);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
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
        {isOpen && cardRectRef.current ? (
          <div
            aria-hidden="true"
            style={{ height: `${cardRectRef.current.height}px` }}
          />
        ) : null}
        <div
          ref={panelRef}
          role={isOpen ? "dialog" : "button"}
          tabIndex={0}
          onClick={() => {
            if (!isOpen) openModal();
          }}
          onKeyDown={(event) => {
            if (isOpen) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openModal();
            }
          }}
          aria-haspopup={isOpen ? undefined : "dialog"}
          aria-expanded={isOpen || undefined}
          aria-modal={isOpen || undefined}
          aria-labelledby={titleId}
          className={cn(
            "group isolate w-full text-left transition-[transform,opacity] duration-300 ease-out",
            isOpen
              ? "fixed left-1/2 bottom-0 z-50 h-[min(85vh,55rem)] w-[min(92vw,64rem)] rounded-t-[2.5rem] rounded-b-none border border-neutral-200 dark:border-neutral-600 bg-card p-6 shadow-2xl md:p-10"
              : "relative mt-8 mb-4 h-[90%] w-full overflow-visible group-hover:-translate-y-2",
            isOpen && !isVisible ? "opacity-0" : "opacity-100"
          )}
          style={{
            transform: isOpen
              ? isVisible
                ? "translate(-50%, 0) scale(1, 1)"
                : `translate(calc(-50% + ${transformFrom.x}px), ${transformFrom.y}px) scale(${transformFrom.scaleX}, ${transformFrom.scaleY})`
              : undefined,
            transformOrigin: "center",
          }}
        >
          {isOpen ? (
            <>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 dark:text-neutral-200 transition hover:border-neutral-400 dark:hover:text-neutral-400 hover:text-neutral-900"
                aria-label="Close project gallery"
              >
                ✕
              </button>
              <div className="grid h-full min-h-0 gap-6 lg:grid-cols-12">
                <div className="col-span-8 flex h-full min-h-0 items-start justify-center rounded-lg">
                  <div
                    className="h-full min-h-0 w-full max-w-2xl overflow-y-auto rounded-lg [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
                <div className="space-y-4 lg:col-span-4 lg:col-start-9">
                  <h3
                    id={titleId}
                    className="text-2xl font-semibold text-neutral-900 dark:text-white"
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                    {description}
                  </p>
                  {githubUrl ? (
                    <Link
                      href={githubUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm hover:underline hover:underline-offset-2"
                    >
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </Link>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute left-6 top-[70px] z-10 h-24 w-[calc(100%-3rem)] -translate-y-full overflow-visible">
                <div className="flex items-end">
                  {images.slice(0, 5).map((src, index) => (
                    <div
                      key={`${src}-${index}`}
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
                        src={src}
                        alt=""
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
              <div className="absolute inset-0 -top-4 z-0 h-full rounded-3xl bg-neutral-100 dark:bg-slate-900 border border-neutral-200 dark:border-neutral-800 text-black shadow-sm" />
              <div className="relative z-20 flex h-full flex-col justify-between rounded-3xl border text-black bg-card border-neutral-200 dark:border-neutral-800 p-6 pt-10 shadow-sm hover:translate-y-2 transition-transform duration-300 ease-in-out">
                <div className="space-y-3">
                  <h3
                    id={titleId}
                    className="text-xl font-semibold tracking-tight text-primary dark:text-white"
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-gray-300">
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
          )}
        </div>
      </div>

      {isOpen ? (
        <div
          className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
