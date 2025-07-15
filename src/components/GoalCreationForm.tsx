import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Plus, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Goal, Filter } from '@/types/goal';
import { EventTrackingExample } from './EventTrackingExample';
import { VerificationLoader } from './VerificationLoader';

interface GoalCreationFormProps {
  onGoalCreated: (goal: Goal) => void;
  onBack: () => void;
}

export const GoalCreationForm: React.FC<GoalCreationFormProps> = ({ onGoalCreated, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    assignedTo: '',
    timeframe: '',
    targetValue: 0,
    filters: [{
      id: '1',
      operand: 'event_name',
      operator: 'includes' as const,
      value: ''
    }] as Filter[]
  });

  const [showVerification, setShowVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showEventTracking, setShowEventTracking] = useState(false);
  const [currentFilterId, setCurrentFilterId] = useState<string | null>(null);
  const [eventSearchTerm, setEventSearchTerm] = useState<{ [key: string]: string }>({});

  // Predefined event names
  const eventNames = [
    'Button Click',
    'Form Submit',
    'Page View',
    'Link Click',
    'File Download',
    'Video Play',
    'Newsletter Signup',
    'Product Purchase'
  ];

  // Available operands
  const operands = [
    { value: 'event_name', label: 'Event Name' },
    { value: 'city', label: 'City' },
    { value: 'utm_source', label: 'UTM Source' },
    { value: 'utm_channel', label: 'UTM Channel' },
    { value: 'utm_campaign', label: 'UTM Campaign' },
    { value: 'page_url', label: 'Page URL' },
    { value: 'referrer', label: 'Referrer' }
  ];

  // Available operators
  const operators = [
    { value: 'includes', label: 'Includes' },
    { value: 'equals', label: 'Equals' },
    { value: 'excludes', label: 'Excludes' }
  ];

  const addFilter = () => {
    const newFilter: Filter = {
      id: Date.now().toString(),
      operand: 'event_name',
      operator: 'includes',
      value: ''
    };
    setFormData(prev => ({
      ...prev,
      filters: [...prev.filters, newFilter]
    }));
  };

  const removeFilter = (filterId: string) => {
    setFormData(prev => ({
      ...prev,
      filters: prev.filters.filter(f => f.id !== filterId)
    }));
  };

  const updateFilter = (filterId: string, field: keyof Filter, value: any) => {
    setFormData(prev => ({
      ...prev,
      filters: prev.filters.map(f =>
        f.id === filterId ? { ...f, [field]: value } : f
      )
    }));
  };

  const handleEventSearch = (filterId: string, searchTerm: string) => {
    setEventSearchTerm(prev => ({ ...prev, [filterId]: searchTerm }));
    updateFilter(filterId, 'value', searchTerm);
  };

  const handleCreateNewEvent = (filterId: string) => {
    setCurrentFilterId(filterId);
    setShowEventTracking(true);
  };

  const handleEventCreated = () => {
    setShowEventTracking(false);
    setCurrentFilterId(null);
  };

  const getFilteredEvents = (searchTerm: string) => {
    if (!searchTerm) return eventNames;
    return eventNames.filter(event => 
      event.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSubmit = async () => {
    setShowVerification(true);
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setTimeout(() => {
        const newGoal: Goal = {
          id: Date.now().toString(),
          name: formData.name,
          assignedTo: formData.assignedTo ? [formData.assignedTo] : [],
          timeframe: formData.timeframe,
          folder: '',
          metric: 'conversions',
          filters: formData.filters,
          targetValue: formData.targetValue,
          uniques: Math.floor(Math.random() * 100000),
          total: Math.floor(Math.random() * 120000),
          conversionRate: Math.random() * 10,
          status: 'active',
          lastUpdated: new Date().toISOString(),
          owner: 'Current User',
          progress: Math.random() * 100
        };
        onGoalCreated(newGoal);
      }, 1000);
    }, 3000);
  };

  const isFormValid = formData.name && formData.timeframe;

  if (showVerification) {
    return <VerificationLoader isVerifying={isVerifying} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Create New Goal</h1>
        </div>
      </div>

      <div className="flex">
        {/* Right Side - Filters and Target (now the only side) */}
        <div className="w-full p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Basic Goal Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="goalName" className="text-sm font-medium mb-2 block text-foreground">
                  Goal name
                </Label>
                <Input
                  id="goalName"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter goal name"
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="assignTo" className="text-sm font-medium mb-2 block text-foreground">
                  Assign to
                </Label>
                <div className="relative">
                  <Input
                    id="assignTo"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                    placeholder="Select user"
                    className="bg-background border-border text-foreground pr-10"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <Label htmlFor="timeframe" className="text-sm font-medium mb-2 block text-foreground">
                  Timeframe
                </Label>
                <div className="relative">
                  <select
                    id="timeframe"
                    value={formData.timeframe}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeframe: e.target.value }))}
                    className="w-full bg-background border border-border text-foreground px-3 py-2 rounded-md appearance-none"
                  >
                    <option value="">Select timeframe</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium text-foreground">Filters</Label>
                <Button
                  onClick={addFilter}
                  size="sm"
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-foreground"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add filter
                </Button>
              </div>

              <div className="space-y-3">
                {formData.filters.map((filter) => (
                  <div key={filter.id} className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-container rounded-lg">
                      {/* Operand Selector */}
                      <select 
                        className="flex-1 bg-background border border-border text-foreground px-2 py-1 rounded text-sm"
                        value={filter.operand}
                        onChange={(e) => updateFilter(filter.id, 'operand', e.target.value)}
                      >
                        {operands.map(operand => (
                          <option key={operand.value} value={operand.value}>
                            {operand.label}
                          </option>
                        ))}
                      </select>

                      {/* Operator Selector */}
                      <select 
                        className="bg-background border border-border text-foreground px-2 py-1 rounded text-sm"
                        value={filter.operator}
                        onChange={(e) => updateFilter(filter.id, 'operator', e.target.value as Filter['operator'])}
                      >
                        {operators.map(operator => (
                          <option key={operator.value} value={operator.value}>
                            {operator.label}
                          </option>
                        ))}
                      </select>

                      {/* Value Input - Special handling for event_name */}
                      {filter.operand === 'event_name' ? (
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Search or type event name"
                            className="bg-background border-border text-foreground text-sm"
                            value={eventSearchTerm[filter.id] || filter.value}
                            onChange={(e) => handleEventSearch(filter.id, e.target.value)}
                          />
                          {eventSearchTerm[filter.id] && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                              {getFilteredEvents(eventSearchTerm[filter.id]).map(event => (
                                <button
                                  key={event}
                                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm text-foreground"
                                  onClick={() => {
                                    updateFilter(filter.id, 'value', event);
                                    setEventSearchTerm(prev => ({ ...prev, [filter.id]: '' }));
                                  }}
                                >
                                  {event}
                                </button>
                              ))}
                              {getFilteredEvents(eventSearchTerm[filter.id]).length === 0 && (
                                <button
                                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm text-primary"
                                  onClick={() => handleCreateNewEvent(filter.id)}
                                >
                                  + Create "{eventSearchTerm[filter.id]}" event
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Input
                          placeholder="Enter value"
                          className="flex-1 bg-background border-border text-foreground text-sm"
                          value={filter.value}
                          onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                        />
                      )}

                      <Button
                        onClick={() => removeFilter(filter.id)}
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Event Tracking Implementation - Only show when creating new event for this specific filter */}
                    {showEventTracking && currentFilterId === filter.id && (
                      <div className="ml-3 border border-border rounded-lg p-4 bg-container">
                        <EventTrackingExample 
                          goalName={eventSearchTerm[filter.id] || formData.name}
                          onEventCreated={handleEventCreated}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Target Value */}
            <div>
              <Label htmlFor="targetValue" className="text-sm font-medium mb-2 block text-foreground">
                Goal total
              </Label>
              <Input
                id="targetValue"
                type="number"
                value={formData.targetValue}
                onChange={(e) => setFormData(prev => ({ ...prev, targetValue: parseInt(e.target.value) || 0 }))}
                className="bg-background border-border text-foreground"
                placeholder="0"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-muted disabled:text-muted-foreground text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
