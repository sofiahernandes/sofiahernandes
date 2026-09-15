const ROTATED_BREAKPOINT = 1024;
const MENU_BAR_HEIGHT = 32;
const MENU_BAR_GAP = 10;
const DOCK_CLEARANCE = 88;

export function isRotatedDesktopViewport() {
  if (typeof globalThis.window === 'undefined') return false;

  return (
    globalThis.window.innerWidth < ROTATED_BREAKPOINT &&
    globalThis.window.innerWidth < globalThis.window.innerHeight
  );
}

export function getDesktopViewport() {
  if (typeof globalThis.window === 'undefined') {
    return {
      width: 1024,
      height: 768,
      isRotated: false,
    };
  }

  const width = Math.round(
    globalThis.window.visualViewport?.width ?? globalThis.window.innerWidth
  );
  const height = Math.round(
    globalThis.window.visualViewport?.height ?? globalThis.window.innerHeight
  );
  const isRotated = isRotatedDesktopViewport();

  return {
    width: isRotated ? height : width,
    height: isRotated ? width : height,
    isRotated,
  };
}

export function isCompactDesktopViewport() {
  return false;
}

export function getDesktopWorkArea() {
  const viewport = getDesktopViewport();
  const top = MENU_BAR_HEIGHT + MENU_BAR_GAP;
  const bottom = DOCK_CLEARANCE;

  return {
    left: 0,
    top,
    width: viewport.width,
    height: Math.max(200, viewport.height - top - bottom),
    bottom: viewport.height - bottom,
  };
}

export function clampDesktopWindow(
  position: { x: number; y: number },
  size: { width: number; height: number },
  options: { avoidDock?: boolean } = {}
) {
  const workArea = getDesktopWorkArea();
  const viewport = getDesktopViewport();
  const avoidDock = options.avoidDock ?? true;
  const bottom = avoidDock ? workArea.bottom : viewport.height;
  const availableHeight = Math.max(200, bottom - workArea.top);
  const width = Math.min(size.width, workArea.width);
  const height = Math.min(size.height, availableHeight);

  return {
    position: {
      x: Math.min(
        Math.max(workArea.left, position.x),
        Math.max(workArea.left, workArea.left + workArea.width - width)
      ),
      y: Math.min(
        Math.max(workArea.top, position.y),
        Math.max(workArea.top, bottom - height)
      ),
    },
    size: { width, height },
  };
}

export function getDesktopPointerPosition(event: {
  clientX: number;
  clientY: number;
}) {
  if (!isRotatedDesktopViewport()) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  const width = Math.round(
    globalThis.window.visualViewport?.width ?? globalThis.window.innerWidth
  );

  return {
    x: event.clientY,
    y: width - event.clientX,
  };
}
