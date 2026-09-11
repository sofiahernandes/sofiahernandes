const ROTATED_BREAKPOINT = 1024;

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
