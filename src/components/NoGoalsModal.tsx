
import React from 'react';
import { Target, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoGoalsModalProps {
  onCreateGoal: () => void;
  onTryDemo: () => void;
  onClose: () => void;
}

export const NoGoalsModal: React.FC<NoGoalsModalProps> = ({ 
  onCreateGoal, 
  onTryDemo, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - fully opaque to hide background content */}
      <div className="absolute inset-0 bg-white" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No goals found
          </h2>
          
          <p className="text-gray-600 mb-8">
            Get started by creating your first goal or try our demo mode to explore the features.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={onCreateGoal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Goal
            </Button>
            
            <Button
              onClick={onTryDemo}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Try demo mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
