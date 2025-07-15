
import React, { useState } from 'react';
import { Copy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventTrackingExampleProps {
  goalName?: string;
  onEventCreated?(): void;
}

export const EventTrackingExample: React.FC<EventTrackingExampleProps> = ({ 
  goalName = "Button Click", 
  onEventCreated 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Convert goal name to underscore format
  const eventName = goalName.toLowerCase().replace(/\s+/g, '_');
  
  const beforeCode = `<!-- Before -->
<button class="some-existing-class">Click Me</button>`;

  const afterCode = `<!-- After -->
<button class="some-existing-class thrivestack-event-name=${eventName}>Click Me</button>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleVerifyEvent = () => {
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      if (onEventCreated) {
        onEventCreated();
      }
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Event Tracking Implementation</h4>
      
      <div className="space-y-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Before</span>
            <Button
              onClick={() => copyToClipboard(beforeCode)}
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{beforeCode}</code>
          </pre>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">After</span>
            <Button
              onClick={() => copyToClipboard(afterCode)}
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{afterCode}</code>
          </pre>
        </div>
      </div>

      <div className="text-sm text-gray-400 mb-4">
        Add the <code className="bg-gray-800 px-1 rounded">thrivestack-event-name</code> attribute to track custom events.
      </div>

      {onEventCreated && (
        <div className="flex gap-2">
          <Button
            onClick={handleVerifyEvent}
            disabled={isVerifying}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Event'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
