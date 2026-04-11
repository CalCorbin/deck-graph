import { renderHook } from '@testing-library/react';
import { useGraphZoom } from './useGraphZoom';

describe('useGraphZoom', () => {
  it('should successfully add an event listener for scrolling', () => {
    const mockDiv = document.createElement('div');
    const addEventListenerSpy = jest.spyOn(mockDiv, 'addEventListener');
    const containerRef = { current: mockDiv };
    const handleWheel = jest.fn();

    renderHook(() => useGraphZoom({ containerRef, handleWheel }));

    expect(addEventListenerSpy).toHaveBeenCalledWith('wheel', handleWheel, {
      passive: false,
    });
  });
});
