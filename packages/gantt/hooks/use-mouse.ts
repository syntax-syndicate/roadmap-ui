import throttle from 'lodash.throttle';
import { type MutableRefObject, useEffect, useState } from 'react';

type MousePosition = {
  x: number;
  y: number;
};

export const useMouse = (
  ref: MutableRefObject<HTMLElement | null>
): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = throttle((event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = event.pageX - rect.left + window.scrollX;
        const y = event.pageY - rect.top + window.scrollY;
        setMousePosition({ x, y });
      }
    }, 10);

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

  return mousePosition;
};
