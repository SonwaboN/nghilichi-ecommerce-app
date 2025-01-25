import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ConsultationCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <CalendarIcon className="h-5 w-5 text-[#777A55]" />
        <span className="text-sm font-medium text-gray-700">
          {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {/* Calendar days would be dynamically generated here */}
      </div>
    </div>
  );
};
