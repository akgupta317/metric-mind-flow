
import { render, screen, fireEvent } from '@testing-library/react';
import { ImprovedGoalTable } from '../ImprovedGoalTable';
import { Goal } from '@/types/goal';
import { vi } from 'vitest';

const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Test Goal',
    assignedTo: ['John Doe'],
    timeframe: 'monthly',
    folder: 'Marketing',
    metric: 'conversions',
    filters: [],
    targetValue: 100,
    uniques: 1000,
    total: 1200,
    conversionRate: 5.5,
    status: 'active',
    lastUpdated: '2024-01-15T10:30:00Z',
    owner: 'Test Owner',
    progress: 75.0
  }
];

describe('ImprovedGoalTable', () => {
  const mockProps = {
    goals: mockGoals,
    onCreateGoal: vi.fn(),
    onViewDetails: vi.fn(),
    onEditGoal: vi.fn(),
    onDuplicateGoal: vi.fn(),
    onDeleteGoal: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders goal table with data', () => {
    render(<ImprovedGoalTable {...mockProps} />);
    
    expect(screen.getByText('Test Goal')).toBeInTheDocument();
    expect(screen.getByText('Test Owner')).toBeInTheDocument();
    expect(screen.getByText('5.50%')).toBeInTheDocument();
  });

  it('renders empty state when no goals', () => {
    render(<ImprovedGoalTable {...mockProps} goals={[]} />);
    
    expect(screen.getByText('No goals match your current filters')).toBeInTheDocument();
    expect(screen.getByText('Create Goal')).toBeInTheDocument();
  });

  it('calls onCreateGoal when Create Goal button is clicked in empty state', () => {
    render(<ImprovedGoalTable {...mockProps} goals={[]} />);
    
    const createButton = screen.getByText('Create Goal');
    fireEvent.click(createButton);
    
    expect(mockProps.onCreateGoal).toHaveBeenCalledTimes(1);
  });

  it('formats numbers correctly', () => {
    const goalsWithLargeNumbers: Goal[] = [{
      ...mockGoals[0],
      uniques: 12500,
      total: 15000
    }];

    render(<ImprovedGoalTable {...mockProps} goals={goalsWithLargeNumbers} />);
    
    expect(screen.getByText('12.5k')).toBeInTheDocument();
    expect(screen.getByText('15.0k')).toBeInTheDocument();
  });
});
