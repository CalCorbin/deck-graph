import { FilterOptions } from '@/app/components/ui/FilterPanel/FilterPanel';
import { ToggleButton } from '@/app/components/ui/ToggleButton/ToggleButton';
import { RangeSlider } from '@/app/components/ui/RangeSlider/RangeSlider';

interface VisualStyleSectionProps {
  filters: FilterOptions;
  updateFilter: (
    key: keyof FilterOptions,
    value: string | number | boolean
  ) => void;
}

export const VisualStyleSection = ({
  filters,
  updateFilter,
}: VisualStyleSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Color Scheme
        </label>
        <select
          value={filters.colorScheme}
          onChange={(e) => updateFilter('colorScheme', e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          data-testid="color-scheme-select"
        >
          <option value="default">Default</option>
          <option value="type-based">By Card Type</option>
          <option value="rarity-based">By Rarity</option>
        </select>
      </div>
      <RangeSlider
        label="Node Size"
        value={filters.nodeSize}
        min={20}
        max={80}
        unit="px"
        onChange={(value) => updateFilter('nodeSize', value)}
        testId="node-size-slider"
      />
      <ToggleButton
        label="Show Labels"
        checked={filters.showLabels}
        onChange={(checked) => updateFilter('showLabels', checked)}
        testId="show-labels-toggle"
      />
    </div>
  );
};
