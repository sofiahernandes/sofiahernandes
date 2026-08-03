'use client';

import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    if (openedHomeRef.current) return;
    openedHomeRef.current = true;

    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const winHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
    const aspectRatio = 2700 / 1539;
    const chromeHeight = 28;
    const maxWindowWidth = Math.max(320, winWidth - 200);
    const maxWindowHeight = Math.max(260, winHeight - 200);
    const maxContentWidth = maxWindowWidth;
    const maxContentHeight = maxWindowHeight - chromeHeight;
    const width = Math.min(maxContentWidth, maxContentHeight * aspectRatio);
    const height = width / aspectRatio + chromeHeight;
    const x = Math.max(16, winWidth - width - 24);
    const y = Math.max(26, (winHeight - height) / 2.5);

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
