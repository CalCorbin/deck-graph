import { FilterOptions } from '@/app/components/FilterPanel/FilterPanel';
import { ToggleButton } from '@/app/components/ToggleButton/ToggleButton';
import { RangeSlider } from '@/app/components/RangeSlider/RangeSlider';

interface GraphStructureSectionProps {
  filters: FilterOptions;
  updateFilter: (
    key: keyof FilterOptions,
    value: string | number | boolean
  ) => void;
}

export const GraphStructureSection = ({
  filters,
  updateFilter,
}: GraphStructureSectionProps) => {
  return (
    <div className="space-y-4">
      <ToggleButton
        label="Show Edges"
        checked={filters.showEdges}
        onChange={(checked) => updateFilter('showEdges', checked)}
        testId="show-edges-toggle"
      />
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Edge Style
        </label>
        <select
          value={filters.edgeStyle}
          onChange={(e) => updateFilter('edgeStyle', e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          data-testid="edge-style-select"
        >
          <option value="straight">Straight</option>
          <option value="dashed">Dashed</option>
        </select>
      </div>
      <RangeSlider
        label="Force Strength"
        value={filters.forceStrength}
        min={-1000}
        max={-50}
        onChange={(value) => updateFilter('forceStrength', value)}
        testId="force-strength-slider"
      />
    </div>
  );
};
