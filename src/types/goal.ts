
export interface Goal {
  id: string;
  name: string;
  assignedTo: string[];
  timeframe: string;
  folder?: string;
  metric: string;
  filters: Filter[];
  targetValue: number;
  uniques: number;
  total?: number;
  conversionRate: number;
  status: 'active' | 'paused' | 'completed';
  lastUpdated: string;
  owner: string;
  progress: number;
}

export interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
  includes: boolean;
}

export interface GoalState {
  hasGoals: boolean;
  isCreating: boolean;
  goals: Goal[];
  currentGoal?: Goal;
}
