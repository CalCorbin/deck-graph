import { fetchCards } from '@/services/cards.service';
import { useQuery } from '@tanstack/react-query';

export const useCards = (cards: string[]) => {
  const { data, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: () => fetchCards(cards),
  });

  return { data, isLoading };
};
