
import React, { useState } from 'react';
import { ChevronDown, Filter, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Goal } from '@/types/goal';

interface GoalReportTableProps {
  goals: Goal[];
}

export const GoalReportTable: React.FC<GoalReportTableProps> = ({ goals }) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sample data for demonstration
  const sampleGoals: Goal[] = [
    {
      id: '1',
      name: 'Scroll to Goals',
      uniques: 95700,
      total: undefined,
      conversionRate: 37.44,
      assignedTo: ['John Doe'],
      timeframe: 'monthly',
      metric: 'pageviews',
      filters: [],
      targetValue: 100000,
      status: 'active',
      lastUpdated: '2024-01-15',
      owner: 'Marketing Team',
      progress: 95.7,
      folder: 'Q1 Goals'
    },
    {
      id: '2',
      name: 'Deep scroll - homepage',
      uniques: 14100,
      total: undefined,
      conversionRate: 5.55,
      assignedTo: ['Jane Smith'],
      timeframe: 'weekly',
      metric: 'unique_visitors',
      filters: [],
      targetValue: 15000,
      status: 'active',
      lastUpdated: '2024-01-14',
      owner: 'Product Team',
      progress: 94.0,
      folder: 'Homepage'
    },
    {
      id: '3',
      name: 'Visit /register',
      uniques: 5900,
      total: 7500,
      conversionRate: 2.34,
      assignedTo: ['Mike Johnson'],
      timeframe: 'monthly',
      metric: 'conversions',
      filters: [],
      targetValue: 8000,
      status: 'active',
      lastUpdated: '2024-01-13',
      owner: 'Growth Team',
      progress: 73.8,
      folder: 'Conversion'
    },
    {
      id: '4',
      name: 'Add a site',
      uniques: 4000,
      total: 5500,
      conversionRate: 1.59,
      assignedTo: ['Sarah Wilson'],
      timeframe: 'weekly',
      metric: 'conversions',
      filters: [],
      targetValue: 6000,
      status: 'active',
      lastUpdated: '2024-01-12',
      owner: 'Product Team',
      progress: 66.7,
      folder: 'Onboarding'
    },
    {
      id: '5',
      name: 'Visit /blog*',
      uniques: 3100,
      total: 4400,
      conversionRate: 1.22,
      assignedTo: ['Tom Brown'],
      timeframe: 'monthly',
      metric: 'pageviews',
      filters: [],
      targetValue: 5000,
      status: 'active',
      lastUpdated: '2024-01-11',
      owner: 'Content Team',
      progress: 62.0,
      folder: 'Content'
    }
  ];

  const displayGoals = goals.length > 0 ? goals : sampleGoals;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

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
            <button className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white text-sm">
              <Filter className="w-4 h-4" />
              Hide Filters
            </button>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-lg">
              <span className="text-sm">Status</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 font-medium text-gray-300">Goal</th>
                <th className="text-right p-4 font-medium text-gray-300">Uniques</th>
                <th className="text-right p-4 font-medium text-gray-300">Total</th>
                <th className="text-right p-4 font-medium text-gray-300">CR</th>
                <th className="text-right p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayGoals.map((goal, index) => (
                <tr
                  key={goal.id}
                  className={`border-b border-gray-700 hover:bg-gray-750 transition-colors ${
                    index === 0 ? 'bg-gray-750' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">{goal.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">{formatNumber(goal.uniques)}</td>
                  <td className="p-4 text-right font-mono">
                    {goal.total ? formatNumber(goal.total) : '-'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {goal.conversionRate > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`font-mono ${
                        goal.conversionRate > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {goal.conversionRate > 0 ? '+' : ''}{goal.conversionRate.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white text-xs"
                    >
                      DETAILS
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Total Goals</div>
            <div className="text-2xl font-bold">{displayGoals.length}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Active Goals</div>
            <div className="text-2xl font-bold text-green-500">
              {displayGoals.filter(g => g.status === 'active').length}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Avg. Conversion Rate</div>
            <div className="text-2xl font-bold">
              {(displayGoals.reduce((sum, goal) => sum + Math.abs(goal.conversionRate), 0) / displayGoals.length).toFixed(2)}%
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Total Uniques</div>
            <div className="text-2xl font-bold">
              {formatNumber(displayGoals.reduce((sum, goal) => sum + goal.uniques, 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
