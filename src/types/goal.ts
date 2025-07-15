
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
  operand: string; // event_name, city, utm_source, utm_channel, etc.
  operator: 'includes' | 'equals' | 'excludes';
  value: string;
}

export interface GoalState {
  hasGoals: boolean;
  isCreating: boolean;
  goals: Goal[];
  currentGoal?: Goal;
}
