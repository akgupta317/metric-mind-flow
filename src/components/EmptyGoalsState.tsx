
import React, { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from './FilterSidebar';

interface EmptyGoalsStateProps {
  onCreateGoal: () => void;
}

export const EmptyGoalsState: React.FC<EmptyGoalsStateProps> = ({ onCreateGoal }) => {
  const [showFilters, setShowFilters] = useState(true);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Goal Conversions</h1>
            <div className="flex border border-gray-700 rounded-lg">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-l-lg text-sm font-medium">
                Goals
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white text-sm">
                Properties
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white rounded-r-lg text-sm">
                Funnels
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white text-sm"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-lg">
              <span className="text-sm">Status</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {showFilters && <FilterSidebar />}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md">
            {/* Circular Loading Icon */}
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="w-16 h-16 rounded-full border-4 border-gray-700"></div>
              <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
              <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
            </div>

            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-400 mb-8">
              Try adjusting your search or filters or create a new goal.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={onCreateGoal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5"
              >
                Create from scratch
              </Button>
              
              <div className="relative">
                <Button
                  onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-6 py-2.5 flex items-center gap-2"
                >
                  Start with a template
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                {showTemplateDropdown && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-700 rounded">
                        E-commerce Template
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-700 rounded">
                        SaaS Template
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-700 rounded">
                        Content Template
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
