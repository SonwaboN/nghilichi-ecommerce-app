import React from 'react';
import { Check } from 'lucide-react';

interface CheckoutStepsProps {
  currentStep: number;
  steps: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep, steps }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={`group pl-4 py-2 flex flex-col border-l-4 
                ${step.id < currentStep
                  ? 'border-[#777A55]'
                  : step.id === currentStep
                  ? 'border-[#777A55]'
                  : 'border-gray-200'} 
                md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0`}
            >
              <span
                className={`text-sm font-medium ${
                  step.id < currentStep
                    ? 'text-[#777A55]'
                    : step.id === currentStep
                    ? 'text-[#777A55]'
                    : 'text-gray-500'
                }`}
              >
                {step.id < currentStep ? (
                  <span className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    {step.name}
                  </span>
                ) : (
                  step.name
                )}
              </span>
              <span className="text-sm text-gray-500">{step.description}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
