'use client';

import { CardTypesSection } from '@/app/components/FilterPanel/CardTypesSection/CardTypesSection';
import { GraphStructureSection } from '@/app/components/FilterPanel/GraphStructureSection/GraphStructureSection';
import { VisualStyleSection } from '@/app/components/FilterPanel/VisualStyleSection/VisualStyleSection';
import { CollapsibleSection } from '@/app/components/FilterPanel/CollapsibleSection/CollapsibleSection';
import { FilterHeader } from '@/app/components/FilterPanel/FilterHeader/FilterHeader';
import { ToggleFilterPanelButton } from '@/app/components/FilterPanel/ToggleFilterPanelButton/ToggleFilterPanelButton';
import { useState } from 'react';

export interface FilterOptions {
  showEdges: boolean;
  highlightCardTypes: string[];
  edgeStyle: 'straight' | 'dashed';
  nodeSize: number;
  forceStrength: number;
  showLabels: boolean;
  colorScheme: 'default' | 'type-based' | 'rarity-based';
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export const FilterPanel = ({
  filters,
  onFiltersChange,
  isVisible,
  onToggle,
}: FilterPanelProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const updateFilter = (
    key: keyof FilterOptions,
    value: string[] | string | number | boolean
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleSection = (sectionName: string) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  return (
    <>
      <ToggleFilterPanelButton onToggle={onToggle} isVisible={isVisible} />
      {/* Filter Panel */}
      <div
        className={`fixed top-36 left-4 z-40 w-80 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl backdrop-blur-md border border-gray-600/30 transition-all duration-300 ${
          isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-full pointer-events-none'
        }`}
        style={{
          background: `
          linear-gradient(135deg, 
            rgba(17, 24, 39, 0.95) 0%, 
            rgba(31, 41, 55, 0.90) 50%, 
            rgba(17, 24, 39, 0.95) 100%
          )
        `,
        }}
      >
        <div className="p-6">
          <FilterHeader />
          <CollapsibleSection
            title="Graph Structure"
            isActive={activeSection === 'structure'}
            onToggle={() => toggleSection('structure')}
          >
            <GraphStructureSection
              filters={filters}
              updateFilter={updateFilter}
            />
          </CollapsibleSection>
          <CollapsibleSection
            title="Visual Style"
            isActive={activeSection === 'visual'}
            onToggle={() => toggleSection('visual')}
          >
            <VisualStyleSection filters={filters} updateFilter={updateFilter} />
          </CollapsibleSection>
          <CollapsibleSection
            title="Highlight Card Types"
            isActive={activeSection === 'types'}
            onToggle={() => toggleSection('types')}
          >
            <CardTypesSection filters={filters} updateFilter={updateFilter} />
          </CollapsibleSection>
        </div>
      </div>
      {/* Custom Styles */}
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};
