import { FilterOptions } from '@/app/components/ui/FilterPanel/FilterPanel';

interface CardTypesSectionProps {
  filters: FilterOptions;
  updateFilter: (key: keyof FilterOptions, value: string[]) => void;
}

const CARD_TYPES = [
  'Creature',
  'Instant',
  'Sorcery',
  'Artifact',
  'Enchantment',
  'Planeswalker',
  'Land',
  'Battle',
];

export const CardTypesSection = ({
  filters,
  updateFilter,
}: CardTypesSectionProps) => {
  const toggleCardType = (cardType: string) => {
    const newHighlights = filters.highlightCardTypes.includes(cardType)
      ? filters.highlightCardTypes.filter((t) => t !== cardType)
      : [...filters.highlightCardTypes, cardType];
    updateFilter('highlightCardTypes', newHighlights);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {CARD_TYPES.map((cardType) => (
          <button
            key={cardType}
            onClick={() => toggleCardType(cardType)}
            className={`p-2 text-xs rounded-md transition-colors border ${
              filters.highlightCardTypes.includes(cardType)
                ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
                : 'bg-gray-700/50 border-gray-600/30 text-gray-300 hover:bg-gray-600/50'
            }`}
            data-testid={`card-type-${cardType.toLowerCase()}`}
          >
            {cardType}
          </button>
        ))}
      </div>
      {filters.highlightCardTypes.length > 0 && (
        <button
          onClick={() => updateFilter('highlightCardTypes', [])}
          className="mt-3 w-full p-2 text-xs rounded-md bg-gray-700/50 border border-gray-600/30 text-gray-300 hover:bg-gray-600/50 transition-colors"
          data-testid="clear-card-types"
        >
          Clear All
        </button>
      )}
    </div>
  );
};
