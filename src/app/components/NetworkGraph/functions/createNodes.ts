import { Card } from '@/types/card.types';

export function createNodes(data: Card[]) {
  return data.map((card: Card) => ({
    id: card.id,
    label: card.name,
    imageUrl: card.image_uris?.small || '',
    cardType: card.type_line?.split('—')[0].trim() || '',
    rarity: card.rarity,
    manaCost: card.mana_cost || '',
  }));
}
