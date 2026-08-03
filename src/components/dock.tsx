'use client';

import { MouseEvent, useState } from 'react';
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
}

export default function Dock({ apps, onOpenApp }: DockProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent): void => {
    setMousePosition({
      x: event.pageX || 0,
      y: event.pageY || 0,
    });
  };

  return (
    <nav
      className="dock"
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
