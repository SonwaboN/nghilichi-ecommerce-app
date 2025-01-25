import React from 'react';

    interface LoadingSpinnerProps {
      size?: 'sm' | 'md' | 'lg';
    }

    export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
      let spinnerSize = 'h-4 w-4';
      if (size === 'md') {
        spinnerSize = 'h-6 w-6';
      } else if (size === 'lg') {
        spinnerSize = 'h-8 w-8';
      }

      return (
        <div className={`animate-spin rounded-full border-t-2 border-gray-300 ${spinnerSize}`}></div>
      );
    };
