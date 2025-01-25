import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Clock, Package, Truck } from 'lucide-react';
import { OrderStatus } from '@/types/order';

interface OrderTimelineProps {
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ 
  status, 
  createdAt, 
  updatedAt 
}) => {
  const steps = [
    { 
      status: 'pending', 
      label: 'Order Placed', 
      icon: Clock,
      date: createdAt 
    },
    { 
      status: 'processing', 
      label: 'Processing', 
      icon: Package,
      date: status === 'processing' ? updatedAt : null
    },
    { 
      status: 'shipped', 
      label: 'Shipped', 
      icon: Truck,
      date: status === 'shipped' ? updatedAt : null
    },
    { 
      status: 'delivered', 
      label: 'Delivered', 
      icon: CheckCircle2,
      date: status === 'delivered' ? updatedAt : null
    },
  ];

  const getCurrentStepIndex = () => {
    if (status === 'cancelled') return -1;
    return steps.findIndex(step => step.status === status);
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="py-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isComplete = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.status} className="flex flex-col items-center">
                <div className={`
                  relative flex h-8 w-8 items-center justify-center rounded-full
                  ${isComplete ? 'bg-[#777A55] text-white' : 'bg-gray-100 text-gray-400'}
                  ${isCurrent ? 'ring-2 ring-[#777A55] ring-offset-2' : ''}
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {step.label}
                  </div>
                  {step.date && (
                    <div className="text-xs text-gray-500">
                      {format(new Date(step.date), 'MMM d, h:mm a')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
