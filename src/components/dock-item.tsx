import { memo, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';

export interface DockItemProps {
  mousePosition: {
    x: number;
    y: number;
  };
  name: string;
  src: string;
  active: boolean;
  onClick: () => void;
}

const maxBtnSize = 65;
const minBtnSize = 45;
const maxBtnDistance = 200;

function DockItem({
  active,
  mousePosition,
  name,
  src,
  onClick,
}: DockItemProps) {
  const [isActive, setIsActive] = useState(active || false);
  const dockItemRef = useRef<HTMLLIElement>(null);
  const [dockItemRect, setDockItemRect] = useState<DOMRect | undefined>(
    undefined,
  );
  const [canMagnify, setCanMagnify] = useState(false);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateCanMagnify = () => setCanMagnify(mediaQuery.matches);

    updateCanMagnify();
    mediaQuery.addEventListener('change', updateCanMagnify);
    return () => mediaQuery.removeEventListener('change', updateCanMagnify);
  }, []);

  const buttonStyle = useMemo(() => {
    if (!canMagnify) {
      return {
        height: minBtnSize,
        width: minBtnSize,
      };
    }

    const buttonMidX = dockItemRect?.left
      ? dockItemRect.left + dockItemRect.width / 2
      : 0;
    const buttonMidY = dockItemRect?.top
      ? dockItemRect.top + dockItemRect.height / 2
      : 0;

    const distance =
      dockItemRef.current && dockItemRect
        ? Math.hypot(mousePosition.x - buttonMidX, mousePosition.y - buttonMidY)
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
      transition: 'height 0.25s ease-out, width 0.25s ease-out',
    };
  }, [canMagnify, dockItemRect, mousePosition]);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    switch (name) {
      case 'Email':
        window.open('mailto:sofiahernandes.dev@gmail.com', '_blank');
        break;
      case 'LinkedIn':
        window.open('https://www.linkedin.com/in/sofiahernandes', '_blank');
        break;
      case 'GitHub':
        window.open('https://github.com/sofiahernandes', '_blank');
        break;
      case 'Instagram':
        window.open('https://www.instagram.com/sofiabotechia', '_blank');
        break;
      default:
        onClick();

        if (isActive) {
          return setIsActive(false);
        } else {
          setClicked(true);
          setTimeout(() => setClicked(false), 1500);
          setTimeout(() => setIsActive(true), 1000);
        }
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

export default memo(DockItem);
