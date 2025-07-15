
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
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
      field: '',
      operator: 'includes',
      value: '',
      includes: true
    }] as Filter[]
  });

  const [expandedSections, setExpandedSections] = useState<string[]>(['inputs']);
  const [showVerification, setShowVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showEventTracking, setShowEventTracking] = useState(false);
  const [currentFilterId, setCurrentFilterId] = useState<string | null>(null);

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

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const addFilter = () => {
    const newFilter: Filter = {
      id: Date.now().toString(),
      field: '',
      operator: 'includes',
      value: '',
      includes: true
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

  const handleEventSelect = (filterId: string, eventName: string) => {
    if (eventName === 'create_new') {
      setCurrentFilterId(filterId);
      setShowEventTracking(true);
    } else {
      updateFilter(filterId, 'field', eventName);
      setShowEventTracking(false);
      setCurrentFilterId(null);
    }
  };

  const handleEventCreated = () => {
    setShowEventTracking(false);
    if (currentFilterId) {
      updateFilter(currentFilterId, 'field', formData.name || 'Custom Event');
    }
    setCurrentFilterId(null);
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
          metric: 'conversions', // Default metric
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Create New Goal</h1>
        </div>
      </div>

      <div className="flex">
        {/* Left Side - Goal Details */}
        <div className="w-1/2 p-6 border-r border-gray-800">
          <div className="space-y-6">
            <div>
              <Label htmlFor="goalName" className="text-sm font-medium mb-2 block">
                Goal name
              </Label>
              <Input
                id="goalName"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter goal name"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="assignTo" className="text-sm font-medium mb-2 block">
                Assign to
              </Label>
              <div className="relative">
                <Input
                  id="assignTo"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                  placeholder="Select user"
                  className="bg-gray-800 border-gray-700 text-white pr-10"
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <Label htmlFor="timeframe" className="text-sm font-medium mb-2 block">
                Timeframe
              </Label>
              <div className="relative">
                <select
                  id="timeframe"
                  value={formData.timeframe}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeframe: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md appearance-none"
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

            {/* Goal Setup Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Goal Setup</h3>
              
              <div className="border border-gray-800 rounded-lg">
                <button
                  onClick={() => toggleSection('inputs')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-800"
                >
                  <span>Inputs</span>
                  {expandedSections.includes('inputs') ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes('inputs') && (
                  <div className="p-4 border-t border-gray-800">
                    <p className="text-gray-400 text-sm">Configure input settings here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Filters and Target */}
        <div className="w-1/2 p-6">
          <div className="space-y-6">
            {/* Filters Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium">Filters</Label>
                <Button
                  onClick={addFilter}
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-gray-400 hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add filter
                </Button>
              </div>

              <div className="space-y-3">
                {formData.filters.map((filter) => (
                  <div key={filter.id} className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg">
                    <select 
                      className="flex-1 bg-gray-700 border border-gray-600 text-white px-2 py-1 rounded text-sm"
                      value={filter.field}
                      onChange={(e) => handleEventSelect(filter.id, e.target.value)}
                    >
                      <option value="">Select event</option>
                      {eventNames.map(event => (
                        <option key={event} value={event}>{event}</option>
                      ))}
                      <option value="create_new">+ Create new event</option>
                    </select>
                    
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={filter.includes}
                        onChange={(e) => updateFilter(filter.id, 'includes', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-xs">Includes</span>
                    </div>

                    <Input
                      placeholder="Value"
                      className="flex-1 bg-gray-700 border-gray-600 text-white text-sm"
                      value={filter.value}
                      onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                    />

                    <Button
                      onClick={() => removeFilter(filter.id)}
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Tracking Implementation - Only show when creating new event */}
            {showEventTracking && currentFilterId && (
              <div className="border border-gray-800 rounded-lg p-4">
                <EventTrackingExample 
                  goalName={formData.name}
                  onEventCreated={handleEventCreated}
                />
              </div>
            )}

            {/* Target Value */}
            <div>
              <Label htmlFor="targetValue" className="text-sm font-medium mb-2 block">
                Goal total
              </Label>
              <Input
                id="targetValue"
                type="number"
                value={formData.targetValue}
                onChange={(e) => setFormData(prev => ({ ...prev, targetValue: parseInt(e.target.value) || 0 }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="0"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
