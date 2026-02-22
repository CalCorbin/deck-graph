import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '@/services/cards.service';

const useCards = () => {
  useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  });
};
