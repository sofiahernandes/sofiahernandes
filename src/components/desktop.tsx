'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Window, { AppWindow } from '@/components/window';
import Navbar from './navbar';
import Dock, { AppConfig } from './dock';
import {
  clampDesktopWindow,
  getDesktopViewport,
  getDesktopWorkArea,
  isCompactDesktopViewport,
} from '@/lib/desktop-viewport';

const appsConfig: AppConfig[] = [
  {
    id: 'finder',
    name: 'Finder',
    src: '/images/finder.png',
    component: 'Finder',
    active: false,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    src: '/images/terminal.png',
    component: 'Terminal',
    active: false,
  },
  {
    id: 'email',
    name: 'Email',
    src: '/images/email.png',
    component: 'Email',
    active: false,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    src: '/images/linkedin.png',
    component: 'LinkedIn',
    active: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    src: '/images/instagram.png',
    component: 'Instagram',
    active: false,
  },
  {
    id: 'github',
    name: 'GitHub',
    src: '/images/github.png',
    component: 'Github',
    active: false,
  },
];

const bootImages = [
  '/images/home.png',
  '/images/garden.png',
  '/images/folder.png',
];

const aboutImages = [
  '/images/border.png',
  '/images/character.png',
  '/images/clothes/shirt-1.png',
  '/images/clothes/shirt-2.png',
  '/images/clothes/shirt-3.png',
  '/images/clothes/pants-1.png',
  '/images/clothes/pants-2.png',
];

const Desktop = () => {
  const folderIcons = [
    { id: 'folder-1', title: 'Projects', x: '1rem', y: '20%' },
    { id: 'folder-2', title: 'About', x: '4rem', y: '35%' },
    { id: 'folder-3', title: 'Resume', x: '1rem', y: '50%' },
    { id: 'folder-4', title: 'Contact', x: '4rem', y: '65%' },
  ];

  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [desktopChromeReady, setDesktopChromeReady] = useState(false);
  const [desktopBootReady, setDesktopBootReady] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  const openedHomeRef = useRef(false);
  const preloadPromisesRef = useRef(new Map<string, Promise<void>>());

  const preloadImages = (group: string, sources: string[]) => {
    const existingPreload = preloadPromisesRef.current.get(group);
    if (existingPreload) return existingPreload;

    const preload = Promise.all(
      sources.map(
        (src) =>
          new Promise<void>((resolve) => {
            const image = new globalThis.Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = src;
          }),
      ),
    ).then(() => undefined);

    preloadPromisesRef.current.set(group, preload);
    return preload;
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== id));

    if (activeWindowId === id && openWindows.length > 1) {
      const remainingWindows = openWindows.filter((window) => window.id !== id);
      setActiveWindowId(remainingWindows[remainingWindows.length - 1].id);
    } else if (openWindows.length <= 1) {
      setActiveWindowId(null);
    }
  };

  const setActiveWindow = (id: string) => {
    setActiveWindowId(id);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === desktopRef.current) {
      setActiveWindowId(null);
    }
  };

  const handleLaunchApp = (appConfig: AppConfig) => {
    const existingWindow = openWindows.find((w) => w.id === appConfig.id);
    if (existingWindow) {
      setActiveWindowId(appConfig.id);
      return;
    }

    const { width: winWidth, height: winHeight } = getDesktopViewport();
    const isMobile = isCompactDesktopViewport();

    const workArea = getDesktopWorkArea();
    const width = Math.min(isMobile ? winWidth * 0.9 : 700, workArea.width);
    const height = Math.min(isMobile ? winHeight * 0.7 : 500, workArea.height);

    const { position, size } = clampDesktopWindow(
      {
        x: (winWidth - width) / 2,
        y: (winHeight - height) / 2,
      },
      { width, height },
    );

    const newApp: AppWindow = {
      id: appConfig.id,
      title: appConfig.name,
      component: appConfig.component,
      position,
      size,
      innerWidth: winWidth,
      innerHeight: winHeight,
    };

    openApp(newApp);
  };

  const openApp = (app: AppWindow) => {
    setOpenWindows((prev) => [...prev, app]);
    setActiveWindowId(app.id);
  };

  const handleOpenFolder = async (title: string, id: string) => {
    const existingWindow = openWindows.find((w) => w.id === id);
    if (existingWindow) {
      setActiveWindowId(id);
      return;
    }

    if (title === 'About') void preloadImages('about', aboutImages);

    const { width: winWidth, height: winHeight } = getDesktopViewport();
    const mobile = isCompactDesktopViewport();
    const isAbout = title === 'About';
    const workArea = getDesktopWorkArea();
    const chromeHeight = 28;
    const sideMargin = mobile ? 8 : 16;
    const width = isAbout
      ? (() => {
          const maxWindowWidth = Math.min(
            workArea.width,
            Math.max(320, winWidth - sideMargin * 2),
          );

          return Math.min(maxWindowWidth, Math.max(520, winWidth * 0.72));
        })()
      : mobile
        ? winWidth * 0.9
        : Math.min(520, Math.max(320, winWidth * 0.34), workArea.width);
    const height = isAbout
      ? Math.min(workArea.height, width / (2700 / 1540) + chromeHeight)
      : mobile
        ? winHeight * 0.7
        : Math.min(360, Math.max(240, winHeight * 0.3), workArea.height);
    const { position, size } = clampDesktopWindow(
      {
        x: isAbout
          ? (winWidth - width) / 2
          : mobile
            ? (winWidth - width) / 2
            : winWidth * 0.28,
        y: isAbout
          ? (winHeight - height) / 2
          : mobile
            ? (winHeight - height) / 2
            : winHeight * 0.2,
      },
      { width, height },
    );

    openApp({
      id,
      title,
      component: title === 'Contact' ? 'Contact' : 'Folder',
      position,
      size,
      innerWidth: winWidth,
      innerHeight: winHeight,
    });
  };

  useEffect(() => {
    let cancelled = false;

    const bootDesktop = async () => {
      await Promise.all([
        preloadImages('boot', bootImages),
        new Promise<void>((resolve) => window.setTimeout(resolve, 650)),
      ]);

      if (cancelled || openedHomeRef.current) return;
      openedHomeRef.current = true;

      const { width: winWidth, height: winHeight } = getDesktopViewport();
      const mobile = isCompactDesktopViewport();
      const workArea = getDesktopWorkArea();
      const aspectRatio = 2700 / 1539;
      const gardenAspectRatio = 1175 / 940;
      const chromeHeight = 28;
      const maxWindowWidth = Math.max(320, winWidth - (mobile ? 16 : 200));
      const maxWindowHeight = Math.max(220, workArea.height);
      const maxContentWidth = maxWindowWidth;
      const maxContentHeight = maxWindowHeight - chromeHeight;
      const homeMaxContentHeight = maxContentHeight * (mobile ? 0.9 : 0.95);
      const width = Math.min(
        maxContentWidth,
        homeMaxContentHeight * aspectRatio,
      );
      const height = width / aspectRatio + chromeHeight;
      const gardenMaxContentHeight = Math.max(
        260,
        (workArea.height - chromeHeight) * (mobile ? 1.2 : 1.1),
      );
      const gardenContentWidth = Math.min(
        width * (mobile ? 0.7 : 0.65),
        gardenMaxContentHeight * gardenAspectRatio,
      );
      const gardenSize = {
        width: gardenContentWidth,
        height: gardenContentWidth / gardenAspectRatio + chromeHeight,
      };
      const homeWindow = clampDesktopWindow(
        {
          x: mobile ? (winWidth - width) / 2 : winWidth - width - 24,
          y: mobile ? 40 : (winHeight - height) / 2.5,
        },
        { width, height },
      );
      const homeLift = Math.min(height * 0.1, mobile ? 40 : 72);
      const { position, size } = clampDesktopWindow(
        {
          x: homeWindow.position.x,
          y: homeWindow.position.y - homeLift,
        },
        homeWindow.size,
      );
      const gardenOffset = {
        x: Math.min(width * 0.1, mobile ? 50 : 150),
        y: Math.min(height * 0.74, mobile ? 184 : 324),
      };
      const gardenWindow = clampDesktopWindow(
        {
          x: position.x - gardenOffset.x,
          y: position.y + gardenOffset.y,
        },
        gardenSize,
      );

      openApp({
        id: 'garden',
        title: 'Garden',
        component: 'Garden',
        position: gardenWindow.position,
        size: gardenWindow.size,
        innerWidth: winWidth,
        innerHeight: winHeight,
      });

      openApp({
        id: 'home',
        title: 'Home',
        component: 'Home',
        position,
        size,
        innerWidth: winWidth,
        innerHeight: winHeight,
      });

      window.requestAnimationFrame(() => {
        if (!cancelled) {
          setDesktopChromeReady(true);
          setDesktopBootReady(true);
          window.setTimeout(() => {
            void preloadImages('about', aboutImages);
          }, 1000);
        }
      });
    };

    bootDesktop();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="desktop-orientation-frame desktop-viewport bg-gray-50">
      <div
        className={`desktop-stage desktop-scene relative ${
          desktopBootReady ? 'is-ready' : ''
        }`}
      >
        <div
          ref={desktopRef}
          className="relative h-full w-full overflow-hidden"
          onClick={handleDesktopClick}
        >
          <Navbar />

          <div
            className={`desktop-folders-grid desktop-chrome-reveal desktop-folders-reveal absolute inset-0 hidden pt-8 pb-20 md:block ${
              desktopChromeReady ? 'is-ready' : ''
            }`}
          >
            {folderIcons.map((folder) => (
              <button
                key={folder.id}
                className="desktop-folder-icon absolute pointer-events-auto flex flex-col items-center gap-1 text-xs text-black drop-shadow-sm transition-all duration-300 hover:scale-105"
                style={{ left: folder.x, top: folder.y }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenFolder(folder.title, folder.id);
                }}
              >
                <Image
                  src="/images/folder.png"
                  alt={folder.title}
                  width={72}
                  height={72}
                  className="desktop-folder-icon-image select-none drop-shadow-black drop-shadow-md"
                  priority
                />
                <span className="desktop-folder-icon-label">
                  {folder.title}
                </span>
              </button>
            ))}
          </div>

          <div className="absolute inset-0 pt-8 pb-20 pointer-events-none">
            {openWindows.map((window) => (
              <div key={window.id} className="pointer-events-auto">
                <Window
                  window={window}
                  isActive={activeWindowId === window.id}
                  onClose={() => closeWindow(window.id)}
                  onFocus={() => setActiveWindow(window.id)}
                  onOpenFolder={handleOpenFolder}
                />
              </div>
            ))}
          </div>

          <Dock
            apps={appsConfig}
            onOpenApp={handleLaunchApp}
            className={`desktop-chrome-reveal desktop-dock-reveal ${
              desktopChromeReady ? 'is-ready' : ''
            }`}
          />
        </div>
      </div>
      <div
        className={`desktop-boot-screen ${desktopBootReady ? 'is-ready' : ''}`}
        aria-hidden={desktopBootReady}
      >
        <div className="desktop-boot-folders">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="desktop-boot-dock">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </main>
  );
};

export default Desktop;
