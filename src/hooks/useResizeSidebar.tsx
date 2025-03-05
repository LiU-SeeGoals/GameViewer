import { useState, useCallback, useEffect } from 'react';

interface UseResizeSidebarReturn {
  value: number;
  startResizing: (mouseDownEvent: React.MouseEvent<HTMLDivElement>) => void;
}

const useResizeSidebar = (
  isVertical: boolean,
  startValue: number
): UseResizeSidebarReturn => {
  const [value, setValue] = useState<number>(startValue);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const startResizing = useCallback(
    (mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
      setIsResizing(true);
      mouseDownEvent.preventDefault();
    },
    []
  );

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (!isResizing) {
        return;
      }

      const newValue: number = isVertical
        ? mouseMoveEvent.clientY
        : mouseMoveEvent.clientX;
      setValue(newValue);
    },
    [isResizing]
  );

  useEffect(() => {
    const handleResize = (e: MouseEvent) => resize(e);
    const handleStopResizing = () => stopResizing();

    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleStopResizing);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleStopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  return { value, startResizing };
};

export default useResizeSidebar;
