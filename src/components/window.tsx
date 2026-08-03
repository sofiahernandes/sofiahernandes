'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { X, Minus, ArrowRightIcon as ArrowsMaximize } from 'lucide-react';
import Terminal from '@/components/terminal';
import HomeImage from '@/components/home-image';
import FolderWindow from '@/components/folder-window';

export interface AppWindow {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  innerWidth: number;
  innerHeight: number;
}

const componentMap: Record<
  string,
  React.ComponentType<any>
> = {
  Terminal,
  Home: HomeImage,
  Folder: FolderWindow,
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
  const [resizeStartSize, setResizeStartSize] = useState({
    width: 0,
    height: 0,
  });

  const windowRef = useRef<HTMLDivElement>(null);

  const AppComponent = componentMap[window.component];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      } else if (isResizing && resizeDirection) {
        e.preventDefault();
        const dx = e.clientX - resizeStartPos.x;
        const dy = e.clientY - resizeStartPos.y;

        let newWidth = resizeStartSize.width;
        let newHeight = resizeStartSize.height;
        let newX = position.x;
        let newY = position.y;

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
            newX = position.x + dx;
          }
        }
        if (resizeDirection.includes('n')) {
          const proposedHeight = resizeStartSize.height - dy;
          if (proposedHeight >= minHeight) {
            newHeight = proposedHeight;
            newY = position.y + dy;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        if (resizeDirection.includes('w') || resizeDirection.includes('n')) {
          setPosition({ x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isDragging,
    dragOffset,
    isResizing,
    resizeDirection,
    resizeStartPos,
    resizeStartSize,
    position,
  ]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;

    if ((e.target as HTMLElement).closest('.window-controls')) {
      return;
    }

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    onFocus();
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStartPos({
      x: e.clientX,
      y: e.clientY,
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

      const availableHeight = window.innerHeight - 26;

      setPosition({ x: 0, y: 26 });
      setSize({
        width: window.innerWidth,
        height: availableHeight - 70,
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
      className={`absolute rounded-md overflow-hidden drop-shadow-black/20 drop-shadow-md transition-shadow ${contentBgClass} ${isActive ? 'drop-shadow-lg z-10' : 'drop-shadow-md z-0'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onClick={onFocus}
    >
      <div
        className="h-7 flex items-center px-2"
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className="window-controls flex items-center space-x-2">
          <button
            className="w-3 h-3 rounded-full bg-rose-400 hover:bg-red-600 flex items-center justify-center"
            onClick={onClose}
          >
            <X className="w-2 h-2 text-red-900 opacity-0 hover:opacity-100" />
          </button>
          <button
            className="w-3 h-3 rounded-full bg-yellow-300 hover:bg-yellow-600 flex items-center justify-center"
            onClick={handleMinimize}
          >
            <Minus className="w-2 h-2 text-yellow-900 opacity-0 hover:opacity-100" />
          </button>
          <button
            className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-600 flex items-center justify-center"
            onClick={toggleMaximize}
          >
            <ArrowsMaximize className="w-2 h-2 text-green-900 opacity-0 hover:opacity-100" />
          </button>
        </div>

        <div
          className={`flex-1 text-center text-sm select-none -ml-11 ${textClass}`}
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
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
          />

          <div
            className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, 's')}
          />
          <div
            className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
          />
          <div
            className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
          />
        </>
      )}
    </div>
  );
}
