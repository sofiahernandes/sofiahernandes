'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Window, { AppWindow } from '@/components/window';
import Navbar from './navbar';
import Dock, { AppConfig } from './dock';

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

const Desktop = () => {
  const folderIcons = [
    { id: 'folder-1', title: 'Projects', x: '1rem', y: '20%' },
    { id: 'folder-2', title: 'About', x: '4rem', y: '35%' },
    { id: 'folder-3', title: 'Work', x: '1rem', y: '50%' },
    { id: 'folder-4', title: 'Contact', x: '4rem', y: '65%' },
  ] as const;

  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  const openedHomeRef = useRef(false);

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
      if (showControlCenter) setShowControlCenter(false);
      if (showSpotlight) setShowSpotlight(false);
    }
  };

  const handleLaunchApp = (appConfig: AppConfig) => {
    const existingWindow = openWindows.find((w) => w.id === appConfig.id);
    if (existingWindow) {
      setActiveWindowId(appConfig.id);
      return;
    }

    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const winHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

    const isMobile = winWidth < 768;

    const width = isMobile ? winWidth * 0.9 : 700;
    const height = isMobile ? winHeight * 0.7 : 500;

    const x = Math.max(0, (winWidth - width) / 2);
    const y = Math.max(26, (winHeight - height) / 2);

    const newApp: AppWindow = {
      id: appConfig.id,
      title: appConfig.name,
      component: appConfig.component,
      position: { x, y },
      size: { width, height },
      innerWidth: winWidth,
      innerHeight: winHeight,
    };

    openApp(newApp);
  };

  const openApp = (app: AppWindow) => {
    setOpenWindows((prev) => [...prev, app]);
    setActiveWindowId(app.id);
    if (showLaunchpad) setShowLaunchpad(false);
  };

  const handleOpenFolder = (title: string, id: string) => {
    const existingWindow = openWindows.find((w) => w.id === id);
    if (existingWindow) {
      setActiveWindowId(id);
      return;
    }

    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const winHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
    const mobile = winWidth < 768;
    const isAbout = title === 'About';
    const chromeHeight = 28;
    const sideMargin = mobile ? 8 : 16;
    const topMargin = 40;
    const bottomMargin = mobile ? 40 : 56;
    const width = isAbout
      ? (() => {
          const aspectRatio = 2700 / 1539;
          const maxWindowWidth = Math.max(320, winWidth - sideMargin * 2);
          const maxWindowHeight = Math.max(260, winHeight - topMargin - bottomMargin);
          const maxContentHeight = maxWindowHeight - chromeHeight;

          return Math.min(maxWindowWidth, maxContentHeight * aspectRatio);
        })()
      : mobile
        ? winWidth * 0.9
        : Math.min(520, Math.max(320, winWidth * 0.34));
    const height = isAbout
      ? width / (2700 / 1539) + chromeHeight
      : mobile
        ? winHeight * 0.7
        : Math.min(360, Math.max(240, winHeight * 0.3));
    const x = isAbout
      ? Math.min(
          Math.max(sideMargin, (winWidth - width) / 2),
          winWidth - width - sideMargin
        )
      : mobile
        ? Math.max(0, (winWidth - width) / 2)
        : Math.max(0, winWidth * 0.28);
    const y = isAbout
      ? Math.min(
          Math.max(topMargin, (winHeight - height) / 2),
          winHeight - height - bottomMargin
        )
      : mobile
        ? Math.max(26, (winHeight - height) / 2)
        : Math.max(26, winHeight * 0.2);

    openApp({
      id,
      title,
      component: 'Folder',
      position: {
        x,
        y,
      },
      size: { width, height },
      innerWidth: winWidth,
      innerHeight: winHeight,
    });
  };

  useEffect(() => {
    if (openedHomeRef.current) return;
    openedHomeRef.current = true;

    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const winHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
    const mobile = winWidth < 768;
    const aspectRatio = 2700 / 1539;
    const chromeHeight = 28;
    const maxWindowWidth = Math.max(320, winWidth - (mobile ? 16 : 200));
    const maxWindowHeight = Math.max(260, winHeight - (mobile ? 120 : 200));
    const maxContentWidth = maxWindowWidth;
    const maxContentHeight = maxWindowHeight - chromeHeight;
    const width = Math.min(maxContentWidth, maxContentHeight * aspectRatio);
    const height = width / aspectRatio + chromeHeight;
    const x = mobile
      ? Math.max(8, (winWidth - width) / 2)
      : Math.max(16, winWidth - width - 24);
    const y = mobile ? 40 : Math.max(40, (winHeight - height) / 2.5);

    openApp({
      id: 'home',
      title: 'Home',
      component: 'Home',
      position: { x, y },
      size: { width, height },
      innerWidth: winWidth,
      innerHeight: winHeight,
    });
  }, []);

  return (
    <main className="relative h-screen overflow-hidden bg-gray-100">
      <div className="relative">
        <div
          ref={desktopRef}
          className={`relative h-screen w-screen overflow-hidden`}
          onClick={handleDesktopClick}
        >
          <Navbar />

          <div className="absolute inset-x-0 bottom-32 px-4 md:hidden">
            <div className="grid w-fit grid-cols-2 gap-x-12 gap-y-5 mx-auto">
              {folderIcons.map((folder, index) => (
                <button
                  key={folder.id}
                  className={`pointer-events-auto flex flex-col items-center gap-1 text-xs text-black drop-shadow-sm ${index === 1 ? 'translate-x-4' : index === 0 ? 'translate-x-4' : '-translate-x-4'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenFolder(folder.title, folder.id);
                  }}
                >
                  <Image
                    src="/images/folder.png"
                    alt={folder.title}
                    width={76}
                    height={76}
                    className="select-none"
                    priority
                  />
                  <span>{folder.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 hidden pt-8 pb-20 md:block">
            {folderIcons.map((folder) => (
              <button
                key={folder.id}
                className="absolute pointer-events-auto flex flex-col items-center gap-1 text-xs text-black drop-shadow-sm transition-all duration-300 hover:scale-105"
                style={{ left: folder.x, top: folder.y }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenFolder(folder.title, folder.id);
                }}
              >
                <Image
                  src="/images/folder.png"
                  alt={folder.title}
                  width={76}
                  height={76}
                  className="select-none"
                  priority
                />
                <span>{folder.title}</span>
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
                />
              </div>
            ))}
          </div>

          <Dock apps={appsConfig} onOpenApp={handleLaunchApp} />
        </div>
      </div>
    </main>
  );
};

export default Desktop;
