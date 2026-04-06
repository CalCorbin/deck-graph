import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { FilterOptions } from '@/app/components/FilterPanel/FilterPanel';
import { GraphStructureSection } from './GraphStructureSection';

describe('GraphStructureSection', () => {
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

  it('renders all controls', () => {
    render(
      <GraphStructureSection
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
      />
    );

    expect(screen.getByTestId('show-edges-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('edge-style-select')).toBeInTheDocument();
    expect(screen.getByTestId('force-strength-slider')).toBeInTheDocument();
  });

  it('reflects showEdges filter value', () => {
    render(
      <GraphStructureSection
        filters={{ ...defaultFilters, showEdges: false }}
        updateFilter={mockUpdateFilter}
      />
    );

    expect(screen.getByTestId('show-edges-toggle')).not.toBeChecked();
  });

  it('calls updateFilter when show edges toggle changes', () => {
    render(
      <GraphStructureSection
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
      />
    );

    fireEvent.click(screen.getByTestId('show-edges-toggle'));
    expect(mockUpdateFilter).toHaveBeenCalledWith('showEdges', false);
  });

  it('reflects edgeStyle filter value', () => {
    render(
      <GraphStructureSection
        filters={{ ...defaultFilters, edgeStyle: 'dashed' }}
        updateFilter={mockUpdateFilter}
      />
    );

    expect(screen.getByTestId('edge-style-select')).toHaveValue('dashed');
  });

  it('calls updateFilter when edge style changes', () => {
    render(
      <GraphStructureSection
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
      />
    );

    fireEvent.change(screen.getByTestId('edge-style-select'), {
      target: { value: 'dashed' },
    });
    expect(mockUpdateFilter).toHaveBeenCalledWith('edgeStyle', 'dashed');
  });

  it('calls updateFilter when force strength changes', () => {
    render(
      <GraphStructureSection
        filters={defaultFilters}
        updateFilter={mockUpdateFilter}
      />
    );

    fireEvent.change(screen.getByTestId('force-strength-slider'), {
      target: { value: '-500' },
    });
    expect(mockUpdateFilter).toHaveBeenCalledWith('forceStrength', -500);
  });
});