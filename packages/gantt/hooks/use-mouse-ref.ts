import { type MutableRefObject, useEffect, useRef } from 'react';

type MousePosition = {
  x: number;
  y: number;
};

export const useMouseRef = (
  ref: MutableRefObject<HTMLElement | null>
): MousePosition => {
  const mousePosition = useRef<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = event.pageX - rect.left + window.scrollX;
        const y = event.pageY - rect.top + window.scrollY;
        mousePosition.current = { x, y };
      }
    };

    const updateMousePosition = () => {
      requestAnimationFrame(() => {
        document.addEventListener('mousemove', handleMouseMove);
      });
    };

    document.addEventListener('mousemove', updateMousePosition);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref]);

  return mousePosition.current;
};
