'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRightIcon as BackIcon,
  ArrowLeftIcon as NextIcon,
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
    <section
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#c99b68] px-6 py-6 text-[#25160f] select-none md:px-8 md:py-7"
      style={{
        backgroundImage:
          'repeating-linear-gradient(1deg, rgba(81,45,22,.11) 0 1px, transparent 1px 5px), repeating-linear-gradient(87deg, rgba(255,237,193,.13) 0 2px, transparent 2px 9px), linear-gradient(120deg, #b77c45, #e1bc85 48%, #a96838)',
      }}
    >
      <header className="relative z-30 flex items-center justify-between border-b border-[#4b2816]/30 pb-6">
        <div>
          <p className="text-[9px] font-bold tracking-[0.24em] text-[#5c321b]/80 uppercase">
            Selected work
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight md:text-3xl">
            Projects
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => slideShelf(-1)}
              disabled={!canScrollLeft}
              aria-label="Slide shelf left"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4d2918]/50 bg-[#e7c28b] text-[#4d2918] shadow-[inset_0_1px_1px_rgba(255,255,255,.5),0_1px_2px_rgba(51,25,10,.25)] transition-colors hover:bg-[#f1d59d] disabled:opacity-30 disabled:hover:bg-[#e7c28b]"
            >
              <NextIcon className="w-2 h-2" />
            </button>
            <button
              type="button"
              onClick={() => slideShelf(1)}
              disabled={!canScrollRight}
              aria-label="Slide shelf right"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4d2918]/50 bg-[#e7c28b] text-[#4d2918] shadow-[inset_0_1px_1px_rgba(255,255,255,.5),0_1px_2px_rgba(51,25,10,.25)] transition-colors hover:bg-[#f1d59d] disabled:opacity-30 disabled:hover:bg-[#e7c28b]"
            >
              <BackIcon className="w-2 h-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Shelf Stage */}
      <div className="relative my-auto flex w-full flex-1 flex-col justify-end pt-8 pb-5">
        <div className="pointer-events-none absolute inset-x-0 bottom-5 h-[calc(100%-3rem)] rounded-sm border-x border-t border-[#5a2d16]/45 bg-[#422111]/20 shadow-[inset_0_0_32px_rgba(48,20,5,.48)]" />
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          className="scrollbar-none relative z-10 flex items-end gap-4 overflow-x-auto px-6 pt-8 pb-6 md:gap-6 md:px-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {portfolioProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              style={{ scrollSnapAlign: 'start' }}
              className="group relative flex shrink-0 flex-col items-center text-left focus:outline-none"
            >
              <div className="relative aspect-[600/820] w-[126px] transition-all duration-300 ease-out group-hover:-translate-y-3 group-focus-visible:-translate-y-3 sm:w-[142px] md:w-[158px]">
                <div className="pointer-events-none absolute -inset-x-1 top-3 -bottom-2 bg-black/35 blur-[7px] transition-all duration-300 group-hover:translate-y-3 group-hover:blur-[10px]" />
                <div className="relative h-full w-full overflow-hidden rounded-[1px] border border-black/20 shadow-[-3px_1px_0_rgba(255,235,191,.24),5px_7px_12px_rgba(29,10,2,.45)]">
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} book cover`}
                    fill
                    sizes="(max-width: 768px) 148px, 164px"
                    className="object-cover"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 opacity-80 transition-opacity group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-black/25" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none relative z-20 -mt-10 h-12 w-full border-y border-[#3f1e0d] shadow-[0_8px_15px_rgba(48,18,3,.45),inset_0_2px_1px_rgba(255,221,159,.32),inset_0_-3px_3px_rgba(55,21,4,.55)] md:-mt-12 md:h-14"
          style={{
            background:
              'repeating-linear-gradient(3deg, rgba(62,23,5,.22) 0 1px, transparent 1px 5px), linear-gradient(180deg, #7e3d19, #4d230e)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[#e0a65d]/60" />
          <div className="absolute left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-black/50 bg-[#bc8750] shadow-inner md:left-8" />
          <div className="absolute right-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-black/50 bg-[#bc8750] shadow-inner md:right-8" />
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
          <p className="font-serif text-xl font-medium leading-tight text-balance text-black md:text-2xl md:leading-tight">
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
        className="scrollbar-none relative h-full w-full overflow-y-auto bg-neutral-50 px-6 py-6 px-6 md:px-0"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          {/* Top Navigation Bar inside the window */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/80 pb-6">
            <button
              type="button"
              onClick={onBackToShelf}
              className="inline-flex items-center gap-2 rounded-sm border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-gray-50 hover:text-black"
            >
              Library
            </button>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="inline-flex items-center gap-1 text-sm font-medium text-black transition-opacity hover:opacity-50"
                aria-label={`Previous project: ${prevProject.title}`}
              >
                <NextIcon className="h-2 w-2" />
                <span className="hidden sm:inline">{prevProject.title}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="inline-flex items-center gap-1 text-sm font-medium text-black transition-opacity hover:opacity-50"
                aria-label={`Next project: ${nextProject.title}`}
              >
                <span className="hidden sm:inline">{nextProject.title}</span>
                <BackIcon className="h-2 w-2" />
              </button>
            </div>
          </div>

          <header className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <div className="flex max-w-4xl flex-col items-center">
              <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight text-balance text-black sm:text-6xl md:text-7xl">
                {project.title}
              </h1>
            </div>

            {project.headline && (
              <p className="mt-4 max-w-4xl font-serif text-2xl font-medium leading-tight tracking-tight text-balance text-black md:text-4xl">
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
                  <p className="mt-3 max-w-md text-sm leading-tight text-gray-500 md:text-base">
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
