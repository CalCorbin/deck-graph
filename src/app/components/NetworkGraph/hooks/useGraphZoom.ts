import { useEffect } from 'react';

type UseGraphZoomParams = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleWheel: (event: WheelEvent) => void;
};

// TODO - Fix initial load bug where zoom doesn't work

export function useGraphZoom({
  containerRef,
  handleWheel,
}: UseGraphZoomParams) {
  // Add wheel event listener for zoom
  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener('wheel', handleWheel, {
        // Prevent page scroll so the scroll wheel zooms the graph instead.
        passive: false,
      });
      return () => {
        containerElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel, containerRef]);
}
