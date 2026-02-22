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

  it('should return data from fetchCards', async () => {
    const mockData = { id: 1, name: 'Card 1' };
    (cardsService.fetchCards as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual(mockData);
    });
  });

  it('should return undefined initially', () => {
    (cardsService.fetchCards as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper(),
    });

    expect(result.current[0]).toBeUndefined();
  });
});
