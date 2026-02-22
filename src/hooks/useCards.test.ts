import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCards } from './useCards';
import * as cardsService from '@/services/cards.service';

jest.mock('@/services/cards.service');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

describe('useCards', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch cards with provided array and return data', async () => {
    const mockCards = [{ id: '1', name: 'Card 1' }];
    const cardNames = ['Card 1'];

    (cardsService.fetchCards as jest.Mock).mockResolvedValue(mockCards);

    const { result } = renderHook(() => useCards(cardNames), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual(mockCards);
    });

    expect(cardsService.fetchCards).toHaveBeenCalledWith(cardNames);
  });

  it('should return undefined while loading', () => {
    (cardsService.fetchCards as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useCards(['Card 1']), {
      wrapper: createWrapper(),
    });

    expect(result.current[0]).toBeUndefined();
  });

  it('should pass cards parameter to fetchCards', async () => {
    const cardNames = ['Card A', 'Card B', 'Card C'];
    (cardsService.fetchCards as jest.Mock).mockResolvedValue([]);

    renderHook(() => useCards(cardNames), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(cardsService.fetchCards).toHaveBeenCalledWith(cardNames);
    });
  });
});
