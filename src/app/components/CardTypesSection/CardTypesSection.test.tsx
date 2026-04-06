import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { FilterOptions } from '@/app/components/FilterPanel/FilterPanel';
import { CardTypesSection } from './CardTypesSection';

describe('CardTypesSection', () => {
  const mockUpdateFilter = jest.fn();

  const defaultFilters: FilterOptions = {
    showEdges: true,
    highlightCardTypes: [],
    edgeStyle: 'straight',
    nodeSize: 40,
    forceStrength: -300,
    showLabels: false,
    colorScheme: 'default',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all card type buttons', () => {
    render(
      <CardTypesSection
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
      />
    );

    const expectedCardTypes = [
      'Creature',
      'Instant',
      'Sorcery',
      'Artifact',
      'Enchantment',
      'Planeswalker',
      'Land',
      'Battle',
    ];

    expectedCardTypes.forEach((cardType) => {
      expect(
        screen.getByTestId(`card-type-${cardType.toLowerCase()}`)
      ).toBeInTheDocument();
      expect(screen.getByText(cardType)).toBeInTheDocument();
    });
  });

  it('toggles card type selection when clicked', () => {
    render(
      <CardTypesSection
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
      />
    );

    fireEvent.click(screen.getByTestId('card-type-creature'));

    expect(mockUpdateFilter).toHaveBeenCalledWith('highlightCardTypes', [
      'Creature',
    ]);
  });

  it('deselects card type when already selected', () => {
    const filtersWithSelection: FilterOptions = {
      ...defaultFilters,
      highlightCardTypes: ['Creature', 'Instant'],
    };

    render(
      <CardTypesSection
        filters={filtersWithSelection}
        updateFilter={mockUpdateFilter}
      />
    );

    fireEvent.click(screen.getByTestId('card-type-creature'));

    expect(mockUpdateFilter).toHaveBeenCalledWith('highlightCardTypes', [
      'Instant',
    ]);
  });

  it('applies selected styling to highlighted card types', () => {
    const filtersWithSelection: FilterOptions = {
      ...defaultFilters,
      highlightCardTypes: ['Creature'],
    };

    render(
      <CardTypesSection
        filters={filtersWithSelection}
        updateFilter={mockUpdateFilter}
      />
    );

    const creatureButton = screen.getByTestId('card-type-creature');
    const instantButton = screen.getByTestId('card-type-instant');

    expect(creatureButton).toHaveClass(
      'bg-purple-600/20',
      'border-purple-500/50',
      'text-purple-300'
    );
    expect(instantButton).toHaveClass(
      'bg-gray-700/50',
      'border-gray-600/30',
      'text-gray-300'
    );
  });

  it('shows clear all button when card types are selected', () => {
    const filtersWithSelection: FilterOptions = {
      ...defaultFilters,
      highlightCardTypes: ['Creature', 'Instant'],
    };

    render(
      <CardTypesSection
        filters={filtersWithSelection}
        updateFilter={mockUpdateFilter}
      />
    );

    expect(screen.getByTestId('clear-card-types')).toBeInTheDocument();
  });

  it('hides clear all button when no card types are selected', () => {
    render(
      <CardTypesSection
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
      />
    );

    expect(screen.queryByTestId('clear-card-types')).not.toBeInTheDocument();
  });

  it('clears all selected card types when clear all is clicked', () => {
    const filtersWithSelection: FilterOptions = {
      ...defaultFilters,
      highlightCardTypes: ['Creature', 'Instant', 'Sorcery'],
    };

    render(
      <CardTypesSection
        filters={filtersWithSelection}
        updateFilter={mockUpdateFilter}
      />
    );

    fireEvent.click(screen.getByTestId('clear-card-types'));

    expect(mockUpdateFilter).toHaveBeenCalledWith('highlightCardTypes', []);
  });

  it('handles multiple card type selections', () => {
    const filtersWithOneSelection: FilterOptions = {
      ...defaultFilters,
      highlightCardTypes: ['Creature'],
    };

    render(
      <CardTypesSection
        filters={filtersWithOneSelection}
        updateFilter={mockUpdateFilter}
      />
    );

    fireEvent.click(screen.getByTestId('card-type-instant'));

    expect(mockUpdateFilter).toHaveBeenCalledWith('highlightCardTypes', [
      'Creature',
      'Instant',
    ]);
  });
});
