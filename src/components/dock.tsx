'use client';

import { MouseEvent, useState } from 'react';
import DockItem from '@/components/dock-item';

const buttons = [
  {
    name: 'Finder',
    src: '/images/finder.png',
    active: false,
  },
  {
    name: 'Email',
    src: '/images/email.png',
    active: false,
  },
  {
    name: 'LinkedIn',
    src: '/images/linkedin.png',
    active: false,
  },
  {
    name: 'Instagram',
    src: '/images/instagram.png',
    active: false,
  },
  {
    name: 'GitHub',
    src: '/images/github.png',
    active: false,
  },
  {
    name: 'System Settings',
    src: '/images/system_settings.png',
    active: true,
  },
]

export default function Dock() {
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
        {buttons.map(({ active, name, src }) => (
          <DockItem
            active={active}
            key={name}
            mousePosition={mousePosition}
            name={name}
            src={src}
          />
        ))}
      </ul>
    </nav>
  );
}
