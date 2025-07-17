
import { render, screen, fireEvent } from '@testing-library/react';
import { GoalAnalyticsPage } from '../GoalAnalyticsPage';
import { vi } from 'vitest';

// Mock the child components
vi.mock('../ImprovedGoalTable', () => ({
  ImprovedGoalTable: ({ goals, onCreateGoal }: any) => (
    <div data-testid="goal-table">
      <span>Goals count: {goals.length}</span>
      <button onClick={onCreateGoal}>Create Goal</button>
    </div>
  )
}));

vi.mock('../NoGoalsModal', () => ({
  NoGoalsModal: ({ open, onCreateGoal, onTryDemo }: any) => (
    open ? (
      <div data-testid="no-goals-modal">
        <button onClick={onCreateGoal}>Create Goal</button>
        <button onClick={onTryDemo}>Try Demo</button>
      </div>
    ) : null
  )
}));

describe('GoalAnalyticsPage', () => {
  it('renders page header correctly', () => {
    render(<GoalAnalyticsPage />);
    
    expect(screen.getByText('Goal Conversions')).toBeInTheDocument();
    expect(screen.getByText('Create Goal')).toBeInTheDocument();
  });

  it('shows no goals modal initially', () => {
    render(<GoalAnalyticsPage />);
    
    expect(screen.getByTestId('no-goals-modal')).toBeInTheDocument();
  });

  it('switches to demo mode when Try Demo is clicked', () => {
    render(<GoalAnalyticsPage />);
    
    const tryDemoButton = screen.getByText('Try Demo');
    fireEvent.click(tryDemoButton);
    
    expect(screen.getByText('Demo Mode')).toBeInTheDocument();
    expect(screen.getByText('Exit Demo')).toBeInTheDocument();
  });

  it('shows and hides filters when filter button is clicked', () => {
    render(<GoalAnalyticsPage />);
    
    // First click Try Demo to get to the main view
    const tryDemoButton = screen.getByText('Try Demo');
    fireEvent.click(tryDemoButton);
    
    const showFiltersButton = screen.getByText('Show Filters');
    fireEvent.click(showFiltersButton);
    
    expect(screen.getByText('Hide Filters')).toBeInTheDocument();
  });
});
