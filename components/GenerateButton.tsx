
import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, children, className = '', disabled = false }) => {
  const isButtonDisabled = isLoading || disabled;

  return (
    <button
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`w-full px-4 py-4 text-lg font-bold text-white bg-purple-600 rounded-lg shadow-lg
                 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50
                 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-600 
                 disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50 flex items-center justify-center ${className}`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default GenerateButton;
