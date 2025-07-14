
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export const FilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['status']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const isExpanded = expandedSections.includes(title.toLowerCase());
    
    return (
      <div className="border-b border-gray-800">
        <button
          onClick={() => toggleSection(title.toLowerCase())}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800"
        >
          <span className="text-sm font-medium">{title}</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {isExpanded && (
          <div className="px-4 pb-3">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-medium text-white">Filters</h3>
      </div>

      <FilterSection title="Goal Status">
        <div className="space-y-2">
          {['Active', 'Paused', 'Completed'].map(status => (
            <label key={status} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-300">{status}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Owner">
        <div className="space-y-2">
          {['John Doe', 'Jane Smith', 'Mike Johnson'].map(owner => (
            <label key={owner} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-300">{owner}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Assigned to">
        <div className="space-y-2">
          {['Team A', 'Team B', 'Marketing'].map(team => (
            <label key={team} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-300">{team}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Folders">
        <div className="space-y-2">
          {['Q1 Goals', 'Marketing', 'Sales'].map(folder => (
            <label key={folder} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-300">{folder}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Metric">
        <div className="space-y-2">
          {['Pageviews', 'Unique Visitors', 'Conversions'].map(metric => (
            <label key={metric} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-300">{metric}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Timeframe">
        <div className="space-y-2">
          {['Weekly', 'Monthly', 'Quarterly'].map(timeframe => (
            <label key={timeframe} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-300">{timeframe}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};
