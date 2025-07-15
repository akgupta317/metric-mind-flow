
import React, { useState } from 'react';
import { ChevronDown, Filter, X, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from './FilterSidebar';

interface EmptyGoalsStateProps {
  onCreateGoal: () => void;
}

export const EmptyGoalsState: React.FC<EmptyGoalsStateProps> = ({ onCreateGoal }) => {
  const [showFilters, setShowFilters] = useState(true);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Goal Conversions</h1>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={onCreateGoal}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Create Goal
            </Button>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground text-sm"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg">
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
            {/* Goal Icon */}
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="w-16 h-16 rounded-full bg-container flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search or filters or create a new goal.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={onCreateGoal}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5"
              >
                Create from scratch
              </Button>
              
              <div className="relative">
                <Button
                  onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-foreground hover:border-border px-6 py-2.5 flex items-center gap-2"
                >
                  Start with a template
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                {showTemplateDropdown && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-lg shadow-xl z-10">
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded">
                        E-commerce Template
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded">
                        SaaS Template
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded">
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
