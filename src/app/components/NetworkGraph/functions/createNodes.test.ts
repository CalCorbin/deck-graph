import { createNodes } from '@/app/components/NetworkGraph/functions/createNodes';
import { mockArtifactCard, mockCardData } from '@/__fixtures__/mockCards';

describe('createNodes', () => {
  it('should create nodes', () => {
    const expected = [
      {
        id: '8d59d264-87ee-4305-bffb-110549331a82',
        label: 'Altar of the Brood',
        imageUrl:
          'https://cards.scryfall.io/small/front/8/d/8d59d264-87ee-4305-bffb-110549331a82.jpg?1562790137',
        cardType: 'Artifact',
        rarity: 'rare',
        manaCost: '{1}',
      },
    ];
    const result = createNodes(mockCardData);
    expect(result).toEqual(expected);
  });

  it('returns empty imageUrl when image_uris is undefined', () => {
    const result = createNodes([
      { ...mockArtifactCard, image_uris: undefined },
    ]);
    expect(result[0].imageUrl).toEqual('');
  });

  it('returns empty imageUrl when image_uris.small is undefined', () => {
    const result = createNodes([
      { ...mockArtifactCard, image_uris: { small: undefined } },
    ]);
    expect(result[0].imageUrl).toEqual('');
  });

  it('returns empty cardType when type_line is undefined', () => {
    const result = createNodes([{ ...mockArtifactCard, type_line: undefined }]);
    expect(result[0].cardType).toEqual('');
  });

  it('returns empty manaCost when mana_cost is undefined', () => {
    const result = createNodes([{ ...mockArtifactCard, mana_cost: undefined }]);
    expect(result[0].manaCost).toEqual('');
  });
});
