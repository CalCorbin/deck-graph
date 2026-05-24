import { Dispatch, SetStateAction, useEffect } from 'react';

type useResizeWindowParams = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  setDimensions: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
};

export function useResizeWindow({
  containerRef,
  setDimensions,
}: useResizeWindowParams) {
  // Update dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        // Account for NavigationBar height (64px = h-16 in Tailwind)
        const navBarHeight = 64;
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight - navBarHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
    // containerRef is a stable ref object; setDimensions is a stable useState setter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
