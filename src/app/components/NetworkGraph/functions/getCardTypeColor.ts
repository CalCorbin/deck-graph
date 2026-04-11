export const cardTypeColors: { [key: string]: string } = {
  Creature: '#4ade80',
  Instant: '#3b82f6',
  Sorcery: '#8b5cf6',
  Artifact: '#f59e0b',
  Enchantment: '#ec4899',
  Planeswalker: '#f97316',
  Land: '#84cc16',
  Battle: '#ef4444',
};

export const getCardTypeColor = (cardType: string) => {
  return cardTypeColors[cardType] || '#6b7280';
};
