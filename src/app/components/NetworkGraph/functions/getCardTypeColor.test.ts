import {
  cardTypeColors,
  getCardTypeColor,
} from '@/app/components/NetworkGraph/functions/getCardTypeColor';

describe('getCardTypeColor', () => {
  it('should return default color for unknown card type', () => {
    const result = getCardTypeColor('ticklemonster');
    expect(result).toBe('#6b7280');
  });

  it.each(Object.entries(cardTypeColors))(
    'should return %s color for %s card type',
    (cardType, expectedColor) => {
      const result = getCardTypeColor(cardType);
      expect(result).toBe(expectedColor);
    }
  );
});
