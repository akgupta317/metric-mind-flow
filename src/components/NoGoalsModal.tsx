
import React from 'react';
import { Modal, Button } from 'antd';
import { Target } from 'lucide-react';

interface NoGoalsModalProps {
  open: boolean;
  onCreateGoal: () => void;
  onTryDemo: () => void;
  onClose: () => void;
}

export const NoGoalsModal: React.FC<NoGoalsModalProps> = ({ 
  open,
  onCreateGoal, 
  onTryDemo, 
  onClose 
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      className="no-goals-modal"
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div className="text-center py-8">
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
            type="primary"
            size="large"
            onClick={onCreateGoal}
            className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
          >
            Create Goal
          </Button>
          
          <Button
            size="large"
            onClick={onTryDemo}
            className="w-full"
          >
            Try demo mode
          </Button>
        </div>
      </div>
    </Modal>
  );
};
