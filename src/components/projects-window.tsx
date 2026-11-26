'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  portfolioProjects,
  type PortfolioProject,
  type ProjectCaseStudySection,
  type ProjectMediaItem,
} from '@/lib/content/projects';
import BackIcon from '../../public/images/previous-icon.svg?component';
import NextIcon from '../../public/images/next-icon.svg?component';

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
    <section className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-neutral-100 px-5 py-4 text-gray-900 select-none md:px-8 md:py-6">
      {/* Top Shelf Header matching reference image */}
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
          Projects
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => slideShelf(-1)}
              disabled={!canScrollLeft}
              aria-label="Slide shelf left"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-white"
            >
              <BackIcon className="w-2 h-2" />
            </button>
            <button
              type="button"
              onClick={() => slideShelf(1)}
              disabled={!canScrollRight}
              aria-label="Slide shelf right"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-white"
            >
              <NextIcon className="w-2 h-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Shelf Stage */}
      <div className="relative my-auto flex flex-col justify-end pt-2 pb-2">
        {/* Horizontal Sliding Books Track */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          className="scrollbar-none relative z-10 flex items-end gap-5 overflow-x-auto px-4 pt-3 pb-3 md:gap-7 md:px-6"
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
              <div className="relative aspect-[600/820] w-[132px] transition-all duration-300 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2 sm:w-[148px] md:w-[164px]">
                {/* Soft shadow behind book */}
                <div className="pointer-events-none absolute -inset-x-1 top-2 -bottom-1 rounded-[3px] bg-black/20 blur-[6px] transition-all duration-300 group-hover:translate-y-2 group-hover:bg-black/25 group-hover:blur-[9px]" />

                {/* Actual Image Book Cover */}
                <div className="relative h-full w-full overflow-hidden rounded-[2px] shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} book cover`}
                    fill
                    sizes="(max-width: 768px) 148px, 164px"
                    className="object-cover"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/15 opacity-80 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Translucent Amber Acrylic Front Guard Rail + Metallic Screws */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-20 -mt-14 h-16 w-full rounded-[4px] border border-[#E58E26]/55 shadow-[0_10px_22px_rgba(180,95,12,0.18),inset_0_1px_1px_rgba(255,255,255,0.65)] md:-mt-16 md:h-[4.25rem]"
          style={{
            background:
              'linear-gradient(180deg, rgba(247, 162, 67, 0.56) 0%, rgba(235, 138, 38, 0.64) 100%)',
            backdropFilter: 'blur(1.5px) saturate(135%)',
            WebkitBackdropFilter: 'blur(1.5px) saturate(135%)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-white/30 via-white/70 to-white/30" />
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
    const gridCols =
      section.columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

    return (
      <div className="flex flex-col gap-3">
        <div className={`grid ${gridCols} gap-3 md:gap-4`}>
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
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 py-6 md:grid-cols-[1fr_1.65fr] md:gap-12 md:py-10">
      <div className="flex flex-col gap-2">
        {section.eyebrow && (
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            {section.eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-extrabold tracking-tight text-balance text-gray-900 md:text-3xl">
          {section.heading}
        </h2>
      </div>

      <div className="flex flex-col gap-4 leading-relaxed text-gray-700">
        {section.lead && (
          <p className="text-base font-medium text-pretty text-gray-900 md:text-lg">
            {section.lead}
          </p>
        )}
        {section.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-sm text-pretty md:text-base">
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
    <section className="relative h-full w-full overflow-hidden bg-neutral-100 text-gray-900">
      <div
        ref={scrollRef}
        className="scrollbar-none relative h-full w-full overflow-y-auto bg-neutral-100 px-5 py-6 md:px-12 md:py-8"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 pb-16 md:gap-14">
          {/* Top Navigation Bar inside the window */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/80 pb-4">
            <button
              type="button"
              onClick={onBackToShelf}
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Library
            </button>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 transition-opacity hover:opacity-60"
                aria-label={`Previous project: ${prevProject.title}`}
              >
                <BackIcon className="h-2 w-2" />
                <span className="hidden sm:inline">{prevProject.title}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 transition-opacity hover:opacity-60"
                aria-label={`Next project: ${nextProject.title}`}
              >
                <span className="hidden sm:inline">{nextProject.title}</span>
                <NextIcon className="h-2 w-2" />
              </button>
            </div>
          </div>

          {/* Editorial Hero & Challenge Introduction (FutureBrand Case Study Style) */}
          <header className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 pt-2 md:grid-cols-[1fr_1.65fr] md:gap-12">
            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  {project.category} · {project.year}
                </p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-balance text-gray-900 md:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-2 text-sm font-medium text-gray-500">
                  {project.subtitle}
                </p>
              </div>

              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-900 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 leading-relaxed text-gray-700">
              {project.headline && (
                <p className="text-xl font-bold tracking-tight text-balance text-gray-900 md:text-2xl">
                  {project.headline}
                </p>
              )}
              {project.summaryParagraphs.map((paragraph, index) => (
                <p key={index} className="text-sm text-pretty md:text-base">
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

          {/* Metadata, Tags & Engineering Process Footer */}
          <footer className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 border-t border-gray-200 pt-8 md:grid-cols-[1fr_1.65fr] md:gap-12 md:pt-10">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Capabilities & Tags
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Engineering Process
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {project.process}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Project Details
              </h3>
              <div className="mt-1 flex flex-col divide-y divide-gray-200 text-sm">
                {project.credits.map((credit) => (
                  <div
                    key={credit.label}
                    className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-[130px_1fr]"
                  >
                    <span className="font-medium text-gray-500">
                      {credit.label}
                    </span>
                    <span className="text-gray-900">{credit.value}</span>
                  </div>
                ))}
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
