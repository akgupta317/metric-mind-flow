
import React, { useState } from 'react';
import { Copy, CheckCircle, AlertCircle, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImprovedEventTrackingProps {
  eventName: string;
  onComplete: () => void;
}

export const ImprovedEventTracking: React.FC<ImprovedEventTrackingProps> = ({
  eventName,
  onComplete
}) => {
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  const className = `thrivestack-event-${eventName.toLowerCase().replace(/\s+/g, '-')}`;
  
  const beforeCode = `<!-- Your current marketing page button -->
<button class="btn btn-primary">
  Sign Up Now
</button>`;

  const afterCode = `<!-- Add our tracking class to your button -->
<button class="btn btn-primary ${className}">
  Sign Up Now
</button>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Code className="w-4 h-4 text-blue-600" />
        </div>
        <h4 className="text-lg font-semibold text-gray-900">Event Tracking Setup</h4>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-blue-900 mb-2">How ThriveStack Event Tracking Works</h5>
              <p className="text-blue-700 text-sm leading-relaxed">
                To track the "<strong>{eventName}</strong>" event, simply add our CSS class to any button, 
                link, or element on your marketing website. When visitors interact with these elements, 
                ThriveStack will automatically capture the event data for your analytics.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="space-y-3">
            <h6 className="font-medium text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">1</span>
              Before (Your current code)
            </h6>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <pre className="text-sm text-green-400 overflow-x-auto">
                <code>{beforeCode}</code>
              </pre>
              <Button
                onClick={() => copyToClipboard(beforeCode)}
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h6 className="font-medium text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
              After (Add ThriveStack tracking)
            </h6>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <pre className="text-sm text-green-400 overflow-x-auto">
                <code>{afterCode}</code>
              </pre>
              <Button
                onClick={() => copyToClipboard(afterCode)}
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h6 className="font-medium text-green-900 mb-1">Class to add:</h6>
              <code className="bg-white px-2 py-1 rounded border text-green-800 font-mono text-sm">
                {className}
              </code>
              <p className="text-green-700 text-sm mt-2">
                Add this class to any element you want to track. No JavaScript required!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onComplete}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Got it, continue
        </Button>
        <Button
          variant="outline"
          onClick={() => copyToClipboard(className)}
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy class name
        </Button>
      </div>
    </div>
  );
};
