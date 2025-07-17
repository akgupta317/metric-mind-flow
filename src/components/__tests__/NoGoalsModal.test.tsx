
import { render, screen, fireEvent } from '@testing-library/react';
import { NoGoalsModal } from '../NoGoalsModal';

describe('NoGoalsModal', () => {
  const mockProps = {
    open: true,
    onCreateGoal: jest.fn(),
    onTryDemo: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when open is true', () => {
    render(<NoGoalsModal {...mockProps} />);
    
    expect(screen.getByText('No goals found')).toBeInTheDocument();
    expect(screen.getByText('Get started by creating your first goal or try our demo mode to explore the features.')).toBeInTheDocument();
  });

  it('does not render modal when open is false', () => {
    render(<NoGoalsModal {...mockProps} open={false} />);
    
    expect(screen.queryByText('No goals found')).not.toBeInTheDocument();
  });

  it('calls onCreateGoal when Create Goal button is clicked', () => {
    render(<NoGoalsModal {...mockProps} />);
    
    const createButton = screen.getByText('Create Goal');
    fireEvent.click(createButton);
    
    expect(mockProps.onCreateGoal).toHaveBeenCalledTimes(1);
  });

  it('calls onTryDemo when Try demo mode button is clicked', () => {
    render(<NoGoalsModal {...mockProps} />);
    
    const demoButton = screen.getByText('Try demo mode');
    fireEvent.click(demoButton);
    
    expect(mockProps.onTryDemo).toHaveBeenCalledTimes(1);
  });
});
