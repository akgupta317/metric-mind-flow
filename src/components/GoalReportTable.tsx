
import React, { useState } from 'react';
import { MoreHorizontal, Filter, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Goal } from '@/types/goal';
import { FilterSidebar } from './FilterSidebar';

interface GoalReportTableProps {
  goals: Goal[];
  onCreateGoal?: () => void;
}

export const GoalReportTable: React.FC<GoalReportTableProps> = ({ goals, onCreateGoal }) => {
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
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Goal Conversions</h1>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={onCreateGoal}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
            
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-foreground"
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
              <select className="bg-card border border-border text-foreground px-3 py-1 rounded text-sm">
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
          <div className="bg-card rounded-lg overflow-hidden border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-accent/50">
                  <TableHead className="text-muted-foreground font-medium">Goal</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Uniques</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Total</TableHead>
                  <TableHead className="text-muted-foreground font-medium">CR</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Owner</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Progress</TableHead>
                  <TableHead className="text-muted-foreground font-medium"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goals.map((goal) => (
                  <TableRow key={goal.id} className="border-border hover:bg-accent/30">
                    <TableCell className="font-medium text-foreground">{goal.name}</TableCell>
                    <TableCell className="text-muted-foreground">{formatNumber(goal.uniques)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {goal.total ? formatNumber(goal.total) : '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{goal.conversionRate.toFixed(2)}%</TableCell>
                    <TableCell className={getStatusColor(goal.status)}>
                      {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{goal.owner}</TableCell>
                    <TableCell className="text-muted-foreground">{goal.progress.toFixed(1)}%</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem className="text-foreground hover:bg-accent">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-accent">
                            Edit Goal
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-foreground hover:bg-accent">
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive hover:bg-accent">
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
