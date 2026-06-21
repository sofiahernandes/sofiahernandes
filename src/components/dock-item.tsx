import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';

export interface DockItemProps {
  mousePosition: {
    x: number;
    y: number;
  };
  name: string;
  src: string;
  active: boolean;
}

const maxBtnSize = 65;
const minBtnSize = 45;
const maxBtnDistance = 200;

export default function DockItem({
  active,
  mousePosition,
  name,
  src,
}: DockItemProps) {
  const [isActive, setIsActive] = useState(active || false);
  const dockItemRef = useRef<HTMLLIElement>(null);
  const [dockItemRect, setDockItemRect] = useState<DOMRect | undefined>(
    undefined,
  );

  const handleResize = useCallback(() => {
    const newDockItemRect = dockItemRef.current?.getBoundingClientRect();
    if (newDockItemRect) {
      setDockItemRect(newDockItemRect);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const buttonStyle = useMemo(() => {
    const buttonMidX = dockItemRect?.left
      ? dockItemRect.left + dockItemRect.width / 2
      : 0;
    const buttonMidY = dockItemRect?.top
      ? dockItemRect.top + dockItemRect.height / 2
      : 0;

    const distance =
      dockItemRef.current && dockItemRect
        ? Math.sqrt(
            Math.pow(mousePosition.x - buttonMidX, 2) +
              Math.pow(mousePosition.y - buttonMidY, 2),
          )
        : 0;

    const buttonSize =
      dockItemRef.current && dockItemRect
        ? Math.max(
            minBtnSize,
            maxBtnSize -
              (maxBtnSize - minBtnSize) * (distance / maxBtnDistance),
          )
        : minBtnSize;

    return {
      height: buttonSize,
      width: buttonSize,
      transition: 'all 0.25s ease-out',
    };
  }, [dockItemRef, dockItemRect, mousePosition]);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (isActive) {
      return setIsActive(false);
    } else {
      setClicked(true);
      setTimeout(() => setClicked(false), 1500);
      setTimeout(() => setIsActive(true), 1000);
    }
  };

  return (
    <li className="dock-item" style={buttonStyle} ref={dockItemRef}>
      <button className="btn" onClick={handleClick}>
        <Image
          className={`icon ${clicked ? 'bounce' : ''}`}
          src={src}
          alt={name}
          width={buttonStyle.width}
          height={buttonStyle.height}
          style={buttonStyle}
          placeholder="blur"
          blurDataURL={src}
        />
        <span className={isActive ? 'active' : ''}></span>
      </button>
    </li>
  );
}
