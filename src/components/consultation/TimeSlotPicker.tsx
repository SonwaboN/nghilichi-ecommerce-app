import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00',
];

export const TimeSlotPicker: React.FC = () => {
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Clock className="h-5 w-5 text-[#777A55]" />
        <span className="text-sm font-medium text-gray-700">
          {selectedTime ? `Selected time: ${selectedTime}` : 'Select a time'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedTime(time)}
            className="w-full"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};
