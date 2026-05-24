import {
  getRarityColor,
  rarityColors,
} from '@/app/components/NetworkGraph/functions/getRarityColor';

describe('getRarityColor', () => {
  it('should return default color', () => {
    const result = getRarityColor('the shire');
    expect(result).toBe('#6b7280');
  });

  it('should handle uppercase rarity', () => {
    const result = getRarityColor('MyThIc');
    expect(result).toBe('#f87171');
  });

  it.each(Object.entries(rarityColors))(
    'should return correct %s color',
    (cardType, expectedColor) => {
      const result = getRarityColor(cardType);
      expect(result).toBe(expectedColor);
    }
  );
});
