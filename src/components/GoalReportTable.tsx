
import React, { useState } from 'react';
import { MoreHorizontal, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Goal } from '@/types/goal';
import { FilterSidebar } from './FilterSidebar';

interface GoalReportTableProps {
  goals: Goal[];
}

export const GoalReportTable: React.FC<GoalReportTableProps> = ({ goals }) => {
  const [showFilters, setShowFilters] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'paused':
        return 'text-yellow-400';
      case 'completed':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold">Goal Conversions</h1>
            <div className="flex gap-1 text-sm">
              <button className="px-3 py-1 bg-gray-800 rounded text-white">Goals</button>
              <button className="px-3 py-1 text-gray-400 hover:text-white">Properties</button>
              <button className="px-3 py-1 text-gray-400 hover:text-white">Funnels</button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:text-white"
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
            
            <div className="relative">
              <select className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded text-sm">
                <option>Status: All</option>
                <option>Status: Active</option>
                <option>Status: Paused</option>
                <option>Status: Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Filter Sidebar */}
        {showFilters && <FilterSidebar />}
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/50">
                  <TableHead className="text-gray-300 font-medium">Goal</TableHead>
                  <TableHead className="text-gray-300 font-medium">Uniques</TableHead>
                  <TableHead className="text-gray-300 font-medium">Total</TableHead>
                  <TableHead className="text-gray-300 font-medium">CR</TableHead>
                  <TableHead className="text-gray-300 font-medium">Status</TableHead>
                  <TableHead className="text-gray-300 font-medium">Owner</TableHead>
                  <TableHead className="text-gray-300 font-medium">Progress</TableHead>
                  <TableHead className="text-gray-300 font-medium"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goals.map((goal) => (
                  <TableRow key={goal.id} className="border-gray-700 hover:bg-gray-700/30">
                    <TableCell className="font-medium text-white">{goal.name}</TableCell>
                    <TableCell className="text-gray-300">{formatNumber(goal.uniques)}</TableCell>
                    <TableCell className="text-gray-300">
                      {goal.total ? formatNumber(goal.total) : '-'}
                    </TableCell>
                    <TableCell className="text-gray-300">{goal.conversionRate.toFixed(2)}%</TableCell>
                    <TableCell className={getStatusColor(goal.status)}>
                      {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                    </TableCell>
                    <TableCell className="text-gray-300">{goal.owner}</TableCell>
                    <TableCell className="text-gray-300">{goal.progress.toFixed(1)}%</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            Edit Goal
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
