
import React from 'react';

interface ErrorDisplayProps {
  error: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="w-full p-4 mt-4 text-center bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
      <p className="font-bold">An Error Occurred</p>
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default ErrorDisplay;
