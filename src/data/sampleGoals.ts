
import { Goal } from '@/types/goal';

export const sampleGoals: Goal[] = [
  {
    id: '1',
    name: 'Newsletter Signup',
    assignedTo: ['John Doe', 'Marketing Team'],
    timeframe: 'monthly',
    folder: 'Marketing',
    metric: 'conversions',
    filters: [
      {
        id: '1',
        operand: 'event_name',
        operator: 'equals',
        value: 'newsletter_signup'
      }
    ],
    targetValue: 500,
    uniques: 12500,
    total: 15000,
    conversionRate: 4.2,
    status: 'active',
    lastUpdated: '2024-01-15T10:30:00Z',
    owner: 'Sarah Johnson',
    progress: 78.5
  },
  {
    id: '2',
    name: 'Product Purchase',
    assignedTo: ['Sales Team'],
    timeframe: 'weekly',
    folder: 'Sales',
    metric: 'revenue',
    filters: [
      {
        id: '2',
        operand: 'event_name',
        operator: 'equals',
        value: 'purchase_completed'
      },
      {
        id: '3',
        operand: 'utm_source',
        operator: 'includes',
        value: 'google'
      }
    ],
    targetValue: 1000,
    uniques: 8750,
    total: 9200,
    conversionRate: 2.8,
    status: 'active',
    lastUpdated: '2024-01-14T16:45:00Z',
    owner: 'Mike Chen',
    progress: 92.3
  },
  {
    id: '3',
    name: 'Free Trial Signup',
    assignedTo: ['Growth Team'],
    timeframe: 'weekly',
    folder: 'Growth',
    metric: 'signups',
    filters: [
      {
        id: '4',
        operand: 'event_name',
        operator: 'equals',
        value: 'trial_started'
      }
    ],
    targetValue: 200,
    uniques: 3400,
    total: 3800,
    conversionRate: 5.3,
    status: 'paused',
    lastUpdated: '2024-01-13T09:15:00Z',
    owner: 'Emma Wilson',
    progress: 156.7
  },
  {
    id: '4',
    name: 'Contact Form Submit',
    assignedTo: ['Marketing Team'],
    timeframe: 'monthly',
    folder: 'Lead Gen',
    metric: 'leads',
    filters: [
      {
        id: '5',
        operand: 'event_name',
        operator: 'equals',
        value: 'contact_form_submit'
      },
      {
        id: '6',
        operand: 'city',
        operator: 'includes',
        value: 'New York'
      }
    ],
    targetValue: 150,
    uniques: 2100,
    total: 2350,
    conversionRate: 6.4,
    status: 'completed',
    lastUpdated: '2024-01-12T14:20:00Z',
    owner: 'David Brown',
    progress: 100.0
  }
];
