'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { X, Minus, ArrowRightIcon as ArrowsMaximize } from 'lucide-react';
import {
  clampDesktopWindow,
  getDesktopPointerPosition,
  getDesktopWorkArea,
} from '@/lib/desktop-viewport';

export interface AppWindow {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  innerWidth: number;
  innerHeight: number;
}

const componentMap: Record<string, React.ComponentType<{ title?: string }>> = {
  Terminal: dynamic(() => import('@/components/terminal')),
  Home: dynamic(() => import('@/components/home-image')),
  Garden: dynamic(() => import('@/components/garden-image')),
  Folder: dynamic(() => import('@/components/folder-window')),
};

interface WindowProps {
  window: AppWindow;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

export default function Window({
  window,
  isActive,
  onClose,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState(window.position);
  const [size, setSize] = useState(window.size);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ position, size });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [resizeStartPosition, setResizeStartPosition] = useState({
    x: 0,
    y: 0,
  });
  const [resizeStartSize, setResizeStartSize] = useState({
    width: 0,
    height: 0,
  });

  const windowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position);
  const sizeRef = useRef(size);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  const AppComponent = componentMap[window.component];

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        e.preventDefault();
        const pointer = getDesktopPointerPosition(e);

        const nextWindow = clampDesktopWindow(
          {
            x: pointer.x - dragOffset.x,
            y: pointer.y - dragOffset.y,
          },
          sizeRef.current,
          { avoidDock: false }
        );

        setPosition(nextWindow.position);
      } else if (isResizing && resizeDirection) {
        e.preventDefault();
        const pointer = getDesktopPointerPosition(e);
        const dx = pointer.x - resizeStartPos.x;
        const dy = pointer.y - resizeStartPos.y;

        let newWidth = resizeStartSize.width;
        let newHeight = resizeStartSize.height;
        let newX = resizeStartPosition.x;
        let newY = resizeStartPosition.y;

        const minWidth = 300;
        const minHeight = 200;

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(minWidth, resizeStartSize.width + dx);
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(minHeight, resizeStartSize.height + dy);
        }
        if (resizeDirection.includes('w')) {
          const proposedWidth = resizeStartSize.width - dx;
          if (proposedWidth >= minWidth) {
            newWidth = proposedWidth;
            newX = resizeStartPosition.x + dx;
          }
        }
        if (resizeDirection.includes('n')) {
          const proposedHeight = resizeStartSize.height - dy;
          if (proposedHeight >= minHeight) {
            newHeight = proposedHeight;
            newY = resizeStartPosition.y + dy;
          }
        }

        const nextWindow = clampDesktopWindow(
          { x: newX, y: newY },
          { width: newWidth, height: newHeight },
          { avoidDock: false }
        );

        setSize(nextWindow.size);
        setPosition(nextWindow.position);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('pointermove', handlePointerMove, {
        passive: false,
      });
      document.addEventListener('pointerup', handlePointerUp);
      document.addEventListener('pointercancel', handlePointerUp);
    }

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [
    isDragging,
    dragOffset,
    isResizing,
    resizeDirection,
    resizeStartPos,
    resizeStartPosition,
    resizeStartSize,
  ]);

  const handleTitleBarPointerDown = (e: React.PointerEvent) => {
    if (isMaximized) return;

    if ((e.target as HTMLElement).closest('.window-controls')) {
      return;
    }

    setIsDragging(true);
    const pointer = getDesktopPointerPosition(e.nativeEvent);

    setDragOffset({
      x: pointer.x - position.x,
      y: pointer.y - position.y,
    });

    onFocus();
  };

  const handleResizePointerDown = (
    e: React.PointerEvent,
    direction: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const pointer = getDesktopPointerPosition(e.nativeEvent);

    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStartPos({
      x: pointer.x,
      y: pointer.y,
    });
    setResizeStartPosition({
      x: position.x,
      y: position.y,
    });
    setResizeStartSize({
      width: size.width,
      height: size.height,
    });

    onFocus();
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      setPosition(preMaximizeState.position);
      setSize(preMaximizeState.size);
    } else {
      setPreMaximizeState({ position, size });

      const workArea = getDesktopWorkArea();

      setPosition({ x: workArea.left, y: workArea.top });
      setSize({
        width: workArea.width,
        height: workArea.height,
      });
    }

    setIsMaximized(!isMaximized);
  };

  const handleMinimize = () => {
    onClose();
  };

  const contentBgClass = 'bg-white';
  const textClass = 'text-gray-800';

  return (
    <div
      ref={windowRef}
      className={`desktop-window-shell absolute rounded-md overflow-hidden drop-shadow-black/20 drop-shadow-md transition-shadow ${contentBgClass} ${isActive ? 'drop-shadow-lg z-10' : 'drop-shadow-md z-0'}`}
      style={{
        left: 0,
        top: 0,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      onClick={onFocus}
    >
      <div
        className="flex touch-none items-center px-2 h-7"
        onPointerDown={handleTitleBarPointerDown}
      >
        <div className="window-controls flex items-center space-x-1">
          <button
            className="desktop-window-control desktop-window-close-control flex h-3 w-10 items-center justify-center rounded-full bg-rose-400 hover:bg-red-600 md:w-3"
            onClick={onClose}
          >
            <X className="desktop-window-control-icon desktop-window-close-icon h-2 w-2 text-red-900 md:opacity-60 md:hover:opacity-100" />
          </button>
          <button
            className="desktop-window-control hidden h-3 w-3 items-center justify-center rounded-full bg-yellow-300 hover:bg-yellow-600 md:flex"
            onClick={handleMinimize}
          >
            <Minus className="desktop-window-control-icon h-2 w-2 text-yellow-900 opacity-60 hover:opacity-100" />
          </button>
          <button
            className="desktop-window-control hidden h-3 w-3 items-center justify-center rounded-full bg-green-400 hover:bg-green-600 md:flex"
            onClick={toggleMaximize}
          >
            <ArrowsMaximize className="desktop-window-control-icon h-2 w-2 text-green-900 opacity-60 hover:opacity-100" />
          </button>
        </div>

        <div
          className={`desktop-window-title flex-1 select-none text-center text-sm pr-14 ${textClass}`}
        >
          {window.title}
        </div>
      </div>

      <div className={`${contentBgClass} h-[calc(100%-1.75rem)] overflow-auto`}>
        {AppComponent ? (
          <AppComponent title={window.title} />
        ) : (
          <div className="p-4">Content not available</div>
        )}
      </div>

      {!isMaximized && (
        <>
          <div
            className="absolute bottom-0 right-0 z-20 h-4 w-4 cursor-se-resize touch-none"
            onPointerDown={(e) => handleResizePointerDown(e, 'se')}
          />

          <div
            className="absolute bottom-0 left-4 right-4 z-20 h-2 cursor-s-resize touch-none"
            onPointerDown={(e) => handleResizePointerDown(e, 's')}
          />
          <div
            className="absolute right-0 top-4 bottom-4 z-20 w-2 cursor-e-resize touch-none"
            onPointerDown={(e) => handleResizePointerDown(e, 'e')}
          />
        </>
      )}
    </div>
  );
}
