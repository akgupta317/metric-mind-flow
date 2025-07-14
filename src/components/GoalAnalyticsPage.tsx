
import React, { useState } from 'react';
import { EmptyGoalsState } from './EmptyGoalsState';
import { GoalCreationForm } from './GoalCreationForm';
import { GoalReportTable } from './GoalReportTable';
import { Goal, GoalState } from '@/types/goal';

export const GoalAnalyticsPage = () => {
  const [state, setState] = useState<GoalState>({
    hasGoals: false,
    isCreating: false,
    goals: [],
    currentGoal: undefined
  });

  const handleCreateGoal = () => {
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
  };

  const handleBackToEmpty = () => {
    setState(prev => ({ ...prev, isCreating: false }));
  };

  if (state.isCreating) {
    return (
      <GoalCreationForm
        onGoalCreated={handleGoalCreated}
        onBack={handleBackToEmpty}
      />
    );
  }

  if (!state.hasGoals) {
    return <EmptyGoalsState onCreateGoal={handleCreateGoal} />;
  }

  return <GoalReportTable goals={state.goals} />;
};
