import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Plus, Trash2, Search, User, Users, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Goal, Filter } from '@/types/goal';
import { ImprovedEventTracking } from './ImprovedEventTracking';
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
  const [showAssignedDropdown, setShowAssignedDropdown] = useState(false);
  const [assignedSearchTerm, setAssignedSearchTerm] = useState('');

  // Sample users for assignment
  const users = [
    { id: '1', name: 'Sarah Johnson', role: 'Marketing Manager' },
    { id: '2', name: 'Mike Chen', role: 'Sales Lead' },
    { id: '3', name: 'Emma Wilson', role: 'Growth Manager' },
    { id: '4', name: 'David Brown', role: 'Product Manager' },
    { id: '5', name: 'Lisa Garcia', role: 'Analytics Specialist' }
  ];

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

  const getFilteredUsers = () => {
    if (!assignedSearchTerm) return users;
    return users.filter(user => 
      user.name.toLowerCase().includes(assignedSearchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(assignedSearchTerm.toLowerCase())
    );
  };

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Create New Goal</h1>
        </div>
      </div>

      <div className="flex justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-gray-50 rounded-lg p-8 space-y-8">
            {/* Basic Goal Info */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="goalName" className="text-sm font-medium mb-2 block text-gray-900">
                  Goal name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="goalName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter goal name (e.g., Newsletter Signup)"
                    className="pl-10 bg-white border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="assignTo" className="text-sm font-medium mb-2 block text-gray-900">
                  Assign to <span className="text-gray-400">(optional)</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="assignTo"
                    value={assignedSearchTerm || formData.assignedTo}
                    onChange={(e) => {
                      setAssignedSearchTerm(e.target.value);
                      setFormData(prev => ({ ...prev, assignedTo: e.target.value }));
                      setShowAssignedDropdown(true);
                    }}
                    onFocus={() => setShowAssignedDropdown(true)}
                    placeholder="Search for a user..."
                    className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  
                  {showAssignedDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {getFilteredUsers().map(user => (
                        <button
                          key={user.id}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, assignedTo: user.name }));
                            setAssignedSearchTerm('');
                            setShowAssignedDropdown(false);
                          }}
                        >
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </button>
                      ))}
                      {getFilteredUsers().length === 0 && (
                        <div className="px-4 py-3 text-gray-500 text-sm">No users found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="timeframe" className="text-sm font-medium mb-2 block text-gray-900">
                  Timeframe <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="timeframe"
                    value={formData.timeframe}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeframe: e.target.value }))}
                    className="w-full pl-10 pr-10 py-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-blue-600 focus:ring-blue-600 appearance-none"
                  >
                    <option value="">Select timeframe</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium text-gray-900">
                  Event Filters <span className="text-red-500">*</span>
                </Label>
                <Button
                  onClick={addFilter}
                  size="sm"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add filter
                </Button>
              </div>

              <div className="space-y-4">
                {formData.filters.map((filter, index) => (
                  <div key={filter.id} className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                      {/* Operand Selector */}
                      <select 
                        className="flex-1 bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-md text-sm focus:border-blue-600 focus:ring-blue-600"
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
                        className="bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-md text-sm focus:border-blue-600 focus:ring-blue-600"
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
                            className="bg-white border-gray-300 text-gray-900 text-sm focus:border-blue-600 focus:ring-blue-600"
                            value={eventSearchTerm[filter.id] || filter.value}
                            onChange={(e) => handleEventSearch(filter.id, e.target.value)}
                          />
                          {eventSearchTerm[filter.id] && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                              {getFilteredEvents(eventSearchTerm[filter.id]).map(event => (
                                <button
                                  key={event}
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-900"
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
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-blue-600 font-medium"
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
                          className="flex-1 bg-white border-gray-300 text-gray-900 text-sm focus:border-blue-600 focus:ring-blue-600"
                          value={filter.value}
                          onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                        />
                      )}

                      <Button
                        onClick={() => removeFilter(filter.id)}
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                        disabled={formData.filters.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Event Tracking Implementation */}
                    {showEventTracking && currentFilterId === filter.id && (
                      <ImprovedEventTracking
                        eventName={eventSearchTerm[filter.id] || formData.name}
                        onComplete={handleEventCreated}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Target Value */}
            <div>
              <Label htmlFor="targetValue" className="text-sm font-medium mb-2 block text-gray-900">
                Goal target <span className="text-gray-400">(optional)</span>
              </Label>
              <Input
                id="targetValue"
                type="number"
                value={formData.targetValue}
                onChange={(e) => setFormData(prev => ({ ...prev, targetValue: parseInt(e.target.value) || 0 }))}
                className="bg-white border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Set a target number for this goal (e.g., 500 signups per month)
              </p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-3"
            >
              Create Goal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
