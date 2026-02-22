'use client';

import { useCards } from '@/hooks/useCards';
import { MagicCard } from '@/app/components/features/MagicCard/MagicCard';

export const NetworkGraph = () => {
  const [data] = useCards();

  if (!data) return null;

  return (
    <div>
      NetworkGraph
      <MagicCard name={data.name} />
    </div>
  );
};
