import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '@/services/cards.service';

export const useCards = () => {
  const { data } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  });

  return [data];
};
