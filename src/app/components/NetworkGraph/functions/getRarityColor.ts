export const rarityColors: { [key: string]: string } = {
  common: '#9ca3af',
  uncommon: '#60a5fa',
  rare: '#fbbf24',
  mythic: '#f87171',
};

export const getRarityColor = (rarity: string) => {
  return rarityColors[rarity.toLowerCase()] || '#6b7280';
};
