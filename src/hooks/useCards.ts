import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '@/services/cards.service';

export const useCards = (cards: string[]) => {
  const { data } = useQuery({
    queryKey: ['cards'],
    queryFn: () => fetchCards(cards),
  });

  return [data];
};
