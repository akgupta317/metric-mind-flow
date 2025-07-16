
import React, { useState } from 'react';
import { MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown, Info, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Goal } from '@/types/goal';

interface ImprovedGoalTableProps {
  goals: Goal[];
  onCreateGoal?: () => void;
  onViewDetails?: (goal: Goal) => void;
  onEditGoal?: (goal: Goal) => void;
  onDuplicateGoal?: (goal: Goal) => void;
  onDeleteGoal?: (goal: Goal) => void;
}

type SortField = 'name' | 'uniques' | 'total' | 'conversionRate' | 'progress';
type SortDirection = 'asc' | 'desc' | null;

export const ImprovedGoalTable: React.FC<ImprovedGoalTableProps> = ({ 
  goals, 
  onCreateGoal,
  onViewDetails,
  onEditGoal,
  onDuplicateGoal,
  onDeleteGoal
}) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
      if (sortDirection === 'desc') {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedGoals = React.useMemo(() => {
    if (!sortField || !sortDirection) return goals;

    return [...goals].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });
  }, [goals, sortField, sortDirection]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'paused':
        return 'text-yellow-600 bg-yellow-50';
      case 'completed':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => {
    const isActive = sortField === field;
    
    return (
      <button
        onClick={() => handleSort(field)}
        className="flex items-center gap-1 hover:text-gray-900 transition-colors"
      >
        {children}
        {isActive ? (
          sortDirection === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowDown className="w-4 h-4" />
          )
        ) : (
          <ArrowUpDown className="w-4 h-4 opacity-50" />
        )}
      </button>
    );
  };

  const InfoTooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block">
      <Info className="w-4 h-4 text-gray-400 cursor-help" />
      <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs text-white bg-gray-900 rounded shadow-lg -translate-x-1/2 left-1/2">
        {text}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-gray-200">
            <TableHead className="text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <SortButton field="name">Goal</SortButton>
                <InfoTooltip text="The name and description of your conversion goal" />
              </div>
            </TableHead>
            <TableHead className="text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <SortButton field="uniques">Uniques</SortButton>
                <InfoTooltip text="Number of unique visitors who could potentially convert" />
              </div>
            </TableHead>
            <TableHead className="text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <SortButton field="total">Total</SortButton>
                <InfoTooltip text="Total number of visits including returning visitors" />
              </div>
            </TableHead>
            <TableHead className="text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <SortButton field="conversionRate">CR</SortButton>
                <InfoTooltip text="Conversion rate - percentage of visitors who completed the goal" />
              </div>
            </TableHead>
            <TableHead className="text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                Status
                <InfoTooltip text="Current status of the goal tracking" />
              </div>
            </TableHead>
            <TableHead className="text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                Owner
                <InfoTooltip text="Person responsible for this goal" />
              </div>
            </TableHead>
            <TableHead className="text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <SortButton field="progress">Progress</SortButton>
                <InfoTooltip text="Progress towards the target goal value" />
              </div>
            </TableHead>
            <TableHead className="text-gray-700 font-medium"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedGoals.map((goal) => (
            <TableRow key={goal.id} className="border-gray-200 hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium text-gray-900">{goal.name}</TableCell>
              <TableCell className="text-gray-600">{formatNumber(goal.uniques)}</TableCell>
              <TableCell className="text-gray-600">
                {goal.total ? formatNumber(goal.total) : '-'}
              </TableCell>
              <TableCell className="text-gray-600">{goal.conversionRate.toFixed(2)}%</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="text-gray-600">{goal.owner}</TableCell>
              <TableCell className="text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{goal.progress.toFixed(1)}%</span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border-gray-200">
                    <DropdownMenuItem 
                      className="text-gray-700 hover:bg-gray-50 cursor-pointer"
                      onClick={() => onViewDetails?.(goal)}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-700 hover:bg-gray-50 cursor-pointer"
                      onClick={() => onEditGoal?.(goal)}
                    >
                      Edit Goal
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-700 hover:bg-gray-50 cursor-pointer"
                      onClick={() => onDuplicateGoal?.(goal)}
                    >
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600 hover:bg-red-50 cursor-pointer"
                      onClick={() => onDeleteGoal?.(goal)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {sortedGoals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No goals match your current filters</p>
          <Button
            onClick={onCreateGoal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Goal
          </Button>
        </div>
      )}
    </div>
  );
};
