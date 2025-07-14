
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EventTrackingExample = () => {
  const beforeCode = `<!-- Before -->
<button class="some-existing-class">Click Me</button>`;

  const afterCode = `<!-- After -->
<button class="some-existing-class plausible-event-name=Button+Click">Click Me</button>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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

      <div className="text-sm text-gray-400">
        Add the <code className="bg-gray-800 px-1 rounded">plausible-event-name</code> attribute to track custom events.
      </div>
    </div>
  );
};
