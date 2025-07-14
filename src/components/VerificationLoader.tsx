
import React from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

interface VerificationLoaderProps {
  isVerifying: boolean;
}

export const VerificationLoader: React.FC<VerificationLoaderProps> = ({ isVerifying }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6">
          {isVerifying ? (
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          ) : (
            <CheckCircle className="w-16 h-16 text-green-500" />
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          {isVerifying ? 'Verifying Events' : 'Verification Complete'}
        </h2>
        
        <p className="text-gray-400 mb-8">
          {isVerifying 
            ? 'Verifying events are being sent and received...'
            : 'Events are being tracked successfully!'
          }
        </p>

        {isVerifying && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};
