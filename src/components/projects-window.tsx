'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftIcon as BackIcon,
  ArrowRightIcon as NextIcon,
  ArrowUpRight,
} from 'lucide-react';
import {
  portfolioProjects,
  type PortfolioProject,
  type ProjectCaseStudySection,
  type ProjectMediaItem,
} from '@/lib/content/projects';

interface ProjectsShelfViewProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export function ProjectsShelfView({ onSelectProject }: ProjectsShelfViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollContainerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => updateScrollButtons());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slideShelf = (direction: -1 | 1) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = Math.max(200, el.clientWidth * 0.55);
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-[#f4f3f0] px-5 py-5 text-[#171717] select-none md:px-10 md:py-8">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight md:text-xl">Projects</h2>

        <div className="flex items-center gap-4 text-sm text-[#9a9a9a] md:gap-5">
          <span className="hidden sm:inline">
            {portfolioProjects.length} {portfolioProjects.length === 1 ? 'project' : 'projects'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => slideShelf(-1)}
              disabled={!canScrollLeft}
              aria-label="Slide shelf left"
              className="flex h-7 w-7 items-center justify-center text-[#a1a1a1] transition-colors hover:text-black disabled:opacity-35"
            >
              <BackIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => slideShelf(1)}
              disabled={!canScrollRight}
              aria-label="Slide shelf right"
              className="flex h-7 w-7 items-center justify-center text-[#a1a1a1] transition-colors hover:text-black disabled:opacity-35"
            >
              <NextIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-5">
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          className="scrollbar-none relative z-10 flex items-end gap-4 overflow-x-auto px-5 py-8 md:gap-5 md:px-10"
          style={{
            scrollSnapType: 'x mandatory',
            scrollPaddingInline: '2.5rem',
          }}
        >
          {portfolioProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              style={{ scrollSnapAlign: 'start' }}
              className="group relative flex shrink-0 flex-col items-center text-left focus:outline-none"
            >
              <div className="relative aspect-[600/820] w-[clamp(84px,12vw,110px)] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2">
                <div className="pointer-events-none absolute inset-x-1 top-2 -bottom-1 bg-black/20 blur-md" />
                <div className="relative h-full w-full overflow-hidden rounded-[2px] border border-black/10 shadow-[0_4px_8px_rgba(0,0,0,.18)]">
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} book cover`}
                    fill
                    sizes="(max-width: 768px) 84px, 110px"
                    className="object-cover"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/15 opacity-70" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none relative z-20 -mt-16 h-[4.75rem] w-full rounded-[10px] border border-[#1687c4]/75 bg-[#35a9e7]/75 shadow-[0_5px_10px_rgba(20,80,120,.16),inset_0_1px_1px_rgba(255,255,255,.65)] backdrop-blur-[1px] md:-mt-20 md:h-[5.5rem]"
        >
          <div className="absolute inset-x-0 top-0 h-px rounded-full bg-white/60" />
          <div className="absolute left-3 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center rounded-full border border-[#868686] bg-[#e6e6e6] shadow-[0_1px_2px_rgba(0,0,0,.28)] md:left-5">
            <span className="h-px w-2 bg-[#8f8f8f] rotate-45" />
          </div>
          <div className="absolute right-3 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center rounded-full border border-[#868686] bg-[#e6e6e6] shadow-[0_1px_2px_rgba(0,0,0,.28)] md:right-5">
            <span className="h-px w-2 bg-[#8f8f8f] rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectDetailInternalPageProps {
  project: PortfolioProject;
  onBackToShelf: () => void;
  onSelectProject: (project: PortfolioProject) => void;
}

function CaseStudyMediaCard({ item }: { item: ProjectMediaItem }) {
  const isFull = item.span === 'full';

  return (
    <figure
      className={`group relative overflow-hidden rounded-sm bg-neutral-900 ${
        isFull ? 'md:col-span-2' : 'col-span-1'
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        {item.type === 'video' ? (
          <video
            key={item.src}
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={item.alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={
              isFull
                ? '(max-width: 1280px) 100vw, 1200px'
                : '(max-width: 768px) 100vw, 600px'
            }
            className="object-cover"
          />
        )}
      </div>
      {item.caption && (
        <figcaption className="bg-neutral-100 pt-2 text-xs text-gray-500">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

function CaseStudySectionRenderer({
  section,
}: {
  section: ProjectCaseStudySection;
}) {
  if (section.type === 'media-grid') {
    return (
      <div className="flex flex-col gap-3">
        <div className={`flex flex-col gap-4`}>
          {section.items.map((item) => (
            <CaseStudyMediaCard key={item.src} item={item} />
          ))}
        </div>
        {section.caption && (
          <p className="text-xs text-gray-500">{section.caption}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 py-10 text-center md:gap-6 md:py-16">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-balance text-black md:text-5xl">
          {section.heading}
        </h2>
      </div>

      <div className="flex flex-col gap-5 text-base leading-tight text-black">
        {section.lead && (
          <p className="text-xl font-medium leading-tight text-balance text-black md:text-xl">
            {section.lead}
          </p>
        )}
        {section.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-balance">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetailInternalPage({
  project,
  onBackToShelf,
  onSelectProject,
}: ProjectDetailInternalPageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentIndex = portfolioProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    portfolioProjects[
      (currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length
    ];
  const nextProject =
    portfolioProjects[(currentIndex + 1) % portfolioProjects.length];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  return (
    <section className="relative h-full w-full overflow-hidden bg-neutral-50 text-black">
      <div
        ref={scrollRef}
        className="scrollbar-none relative h-full w-full overflow-y-auto bg-neutral-50 px-6 pt-6 pb-12 md:px-0"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          {/* Top Navigation Bar inside the window */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={onBackToShelf}
              className="font-semibold text-black transition-colors hover:bg-gray-50 hover:text-black"
            >
              <BackIcon className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="inline-flex items-center gap-1 text-sm font-medium text-black transition-opacity hover:opacity-50"
                aria-label={`Previous project: ${prevProject.title}`}
              >
                <BackIcon className="h-2 w-2" />
                <span className="hidden sm:inline">{prevProject.title}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="inline-flex items-center gap-1 text-sm font-medium text-black transition-opacity hover:opacity-50"
                aria-label={`Next project: ${nextProject.title}`}
              >
                <span className="hidden sm:inline">{nextProject.title}</span>
                <NextIcon className="h-2 w-2" />
              </button>
            </div>
          </div>

          <header className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <div className="flex max-w-4xl flex-col items-center">
              <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight text-balance text-black sm:text-6xl">
                {project.title}
              </h1>
            </div>

            {project.headline && (
              <p className="mt-4 max-w-4xl font-serif text-2xl font-medium leading-tight tracking-tight text-balance text-black md:text-3xl">
                {project.headline}
              </p>
            )}

            {project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-50"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}

            <div className="mt-8 flex max-w-2xl flex-col gap-5 text-base leading-tight text-black">
              {project.summaryParagraphs.map((paragraph, index) => (
                <p key={index} className="text-balance">
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          {/* Interleaved Media Grids & Editorial Text Sections */}
          {project.sections && project.sections.length > 0 && (
            <div className="flex flex-col gap-8 md:gap-12">
              {project.sections.map((section, index) => (
                <CaseStudySectionRenderer key={index} section={section} />
              ))}
            </div>
          )}

          <footer className="mx-auto w-full max-w-4xl border-t border-gray-200 pt-10 md:pt-14">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">
                    Capabilities & Tags
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">
                    Engineering Process
                  </h3>
                  <p className="mt-3 max-w-md leading-tight">
                    {project.process}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Project Details
                </h3>
                <div className="mt-2 flex flex-col divide-y divide-gray-200 text-sm">
                  {project.credits.map((credit) => (
                    <div
                      key={credit.label}
                      className="grid grid-cols-[100px_1fr] gap-4 py-2"
                    >
                      <span className="font-medium text-gray-500">
                        {credit.label}
                      </span>
                      <span className="text-black">{credit.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsWindow({
  projectSlug,
  onSelectProject,
  onBackToShelf,
}: {
  projectSlug?: string;
  onSelectProject?: (project: PortfolioProject) => void;
  onBackToShelf?: () => void;
}) {
  if (projectSlug) {
    const project =
      portfolioProjects.find((p) => p.slug === projectSlug) ??
      portfolioProjects[0];

    return (
      <ProjectDetailInternalPage
        project={project}
        onBackToShelf={() => onBackToShelf?.()}
        onSelectProject={(next) => onSelectProject?.(next)}
      />
    );
  }

  return (
    <ProjectsShelfView
      onSelectProject={(project) => onSelectProject?.(project)}
    />
  );
}
