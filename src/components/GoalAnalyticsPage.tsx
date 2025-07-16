import React, { useState } from 'react';
import { EmptyGoalsState } from './EmptyGoalsState';
import { GoalCreationForm } from './GoalCreationForm';
import { ImprovedGoalTable } from './ImprovedGoalTable';
import { ImprovedFilterSidebar } from './ImprovedFilterSidebar';
import { NoGoalsModal } from './NoGoalsModal';
import { Goal, GoalState } from '@/types/goal';
import { sampleGoals } from '@/data/sampleGoals';
import { Button } from '@/components/ui/button';
import { Filter, Plus, X } from 'lucide-react';

interface FilterState {
  status: string[];
  owner: string[];
  assignedTo: string[];
  timeframe: string[];
}

export const GoalAnalyticsPage = () => {
  const [state, setState] = useState<GoalState>({
    hasGoals: false,
    isCreating: false,
    goals: [],
    currentGoal: undefined
  });

  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showNoGoalsModal, setShowNoGoalsModal] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);

  const displayGoals = isDemoMode ? sampleGoals : state.goals;

  React.useEffect(() => {
    if (isDemoMode) {
      setFilteredGoals(sampleGoals);
    } else {
      setFilteredGoals(state.goals);
    }
  }, [isDemoMode, state.goals]);

  const handleCreateGoal = () => {
    setShowNoGoalsModal(false);
    setState(prev => ({ ...prev, isCreating: true }));
  };

  const handleGoalCreated = (goal: Goal) => {
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, goal],
      hasGoals: true,
      isCreating: false,
      currentGoal: undefined
    }));
    setIsDemoMode(false);
  };

  const handleBackToEmpty = () => {
    setState(prev => ({ ...prev, isCreating: false }));
    if (!state.hasGoals && !isDemoMode) {
      setShowNoGoalsModal(true);
    }
  };

  const handleTryDemo = () => {
    setIsDemoMode(true);
    setShowNoGoalsModal(false);
  };

  const handleFiltersChange = (filters: FilterState) => {
    let filtered = [...displayGoals];

    if (filters.status.length > 0) {
      filtered = filtered.filter(goal => 
        filters.status.some(status => 
          goal.status.toLowerCase() === status.toLowerCase()
        )
      );
    }

    if (filters.owner.length > 0) {
      filtered = filtered.filter(goal => 
        filters.owner.includes(goal.owner)
      );
    }

    if (filters.assignedTo.length > 0) {
      filtered = filtered.filter(goal => 
        goal.assignedTo.some(assigned => filters.assignedTo.includes(assigned))
      );
    }

    if (filters.timeframe.length > 0) {
      filtered = filtered.filter(goal => 
        filters.timeframe.some(timeframe => 
          goal.timeframe.toLowerCase() === timeframe.toLowerCase()
        )
      );
    }

    setFilteredGoals(filtered);
  };

  const handleClearFilters = () => {
    setFilteredGoals(displayGoals);
  };

  // Mock API functions for demo
  const handleViewDetails = (goal: Goal) => {
    console.log('View details for:', goal.name);
    // TODO: Implement goal details modal/page
  };

  const handleEditGoal = (goal: Goal) => {
    console.log('Edit goal:', goal.name);
    // TODO: Implement goal editing
  };

  const handleDuplicateGoal = (goal: Goal) => {
    console.log('Duplicate goal:', goal.name);
    const duplicatedGoal = {
      ...goal,
      id: Date.now().toString(),
      name: `${goal.name} (Copy)`
    };
    
    if (isDemoMode) {
      setFilteredGoals(prev => [...prev, duplicatedGoal]);
    } else {
      setState(prev => ({
        ...prev,
        goals: [...prev.goals, duplicatedGoal]
      }));
    }
  };

  const handleDeleteGoal = (goal: Goal) => {
    console.log('Delete goal:', goal.name);
    if (isDemoMode) {
      setFilteredGoals(prev => prev.filter(g => g.id !== goal.id));
    } else {
      setState(prev => ({
        ...prev,
        goals: prev.goals.filter(g => g.id !== goal.id),
        hasGoals: prev.goals.length > 1
      }));
    }
  };

  if (state.isCreating) {
    return (
      <GoalCreationForm
        onGoalCreated={handleGoalCreated}
        onBack={handleBackToEmpty}
      />
    );
  }

  if (!state.hasGoals && !isDemoMode) {
    return (
      <>
        <EmptyGoalsState onCreateGoal={handleCreateGoal} />
        <NoGoalsModal
          open={showNoGoalsModal}
          onCreateGoal={handleCreateGoal}
          onTryDemo={handleTryDemo}
          onClose={() => setShowNoGoalsModal(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">Goal Conversions</h1>
            {isDemoMode && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Demo Mode
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={handleCreateGoal}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
            
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {showFilters ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Hide Filters
                </>
              ) : (
                <>
                  <Filter className="w-4 h-4 mr-2" />
                  Show Filters
                </>
              )}
            </Button>

            {isDemoMode && (
              <Button
                onClick={() => {
                  setIsDemoMode(false);
                  setShowNoGoalsModal(true);
                }}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Exit Demo
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Filter Sidebar */}
        {showFilters && (
          <ImprovedFilterSidebar
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        )}
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <ImprovedGoalTable
            goals={filteredGoals}
            onCreateGoal={handleCreateGoal}
            onViewDetails={handleViewDetails}
            onEditGoal={handleEditGoal}
            onDuplicateGoal={handleDuplicateGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        </div>
      </div>
    </div>
  );
};
