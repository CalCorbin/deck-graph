import { renderHook } from '@testing-library/react';
import { useResizeWindow } from '@/app/components/NetworkGraph/hooks/useResizeWindow';
import { act } from 'react';

describe('useResizeWindow', () => {
  it('should update dimensions when window is resized', () => {
    const setDimensions = jest.fn();
    const containerRef = { current: document.createElement('div') };

    renderHook(() => useResizeWindow({ containerRef, setDimensions }));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(setDimensions).toHaveBeenCalledWith({
      width: window.innerWidth,
      height: window.innerHeight - 64,
    });
  });
});
