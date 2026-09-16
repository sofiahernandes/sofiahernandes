'use client';

import { MouseEvent, useEffect, useRef, useState } from 'react';
import DockItem from '@/components/dock-item';

export interface AppConfig {
  id: string;
  name: string;
  src: string;
  component: string;
  active: boolean;
}

interface DockProps {
  apps: AppConfig[];
  onOpenApp: (app: AppConfig) => void;
  className?: string;
}

export default function Dock({
  apps,
  onOpenApp,
  className = '',
}: DockProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const nextMousePositionRef = useRef(mousePosition);

  const handleMouseMove = (event: MouseEvent): void => {
    nextMousePositionRef.current = {
      x: event.pageX || 0,
      y: event.pageY || 0,
    };

    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setMousePosition(nextMousePositionRef.current);
    });
  };

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  return (
    <nav
      className={`dock ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <ul className="dock-inner">
        {apps.map((app) => (
          <DockItem
            active={app.active}
            key={app.id}
            mousePosition={mousePosition}
            name={app.name}
            src={app.src}
            onClick={() => onOpenApp(app)}
          />
        ))}
      </ul>
    </nav>
  );
}
