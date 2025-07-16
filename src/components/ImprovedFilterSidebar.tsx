
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterState {
  status: string[];
  owner: string[];
  assignedTo: string[];
  timeframe: string[];
}

interface ImprovedFilterSidebarProps {
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export const ImprovedFilterSidebar: React.FC<ImprovedFilterSidebarProps> = ({
  onFiltersChange,
  onClearFilters
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['status']);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    owner: [],
    assignedTo: [],
    timeframe: []
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleFilterChange = (category: keyof FilterState, value: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      [category]: checked
        ? [...filters[category], value]
        : filters[category].filter(v => v !== value)
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      status: [],
      owner: [],
      assignedTo: [],
      timeframe: []
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

  const FilterSection = ({ 
    title, 
    category, 
    options 
  }: { 
    title: string; 
    category: keyof FilterState;
    options: string[];
  }) => {
    const isExpanded = expandedSections.includes(category);
    
    return (
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection(category)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-900">{title}</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="px-4 pb-3">
            <div className="space-y-2">
              {options.map(option => (
                <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters[category].includes(option)}
                    onChange={(e) => handleFilterChange(category, option, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <Button
              onClick={clearAllFilters}
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto">
        <FilterSection
          title="Goal Status"
          category="status"
          options={['Active', 'Paused', 'Completed']}
        />

        <FilterSection
          title="Owner"
          category="owner"
          options={['Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'David Brown']}
        />

        <FilterSection
          title="Assigned to"
          category="assignedTo"
          options={['John Doe', 'Marketing Team', 'Sales Team', 'Growth Team']}
        />

        <FilterSection
          title="Timeframe"
          category="timeframe"
          options={['Weekly', 'Monthly', 'Quarterly']}
        />
      </div>
    </div>
  );
};
