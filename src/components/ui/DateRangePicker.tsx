import React, { useState } from 'react';
    import { format } from 'date-fns';
    import { Button } from './Button';

    interface DateRangePickerProps {
      onDateChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
    }

    export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
      const [startDate, setStartDate] = useState<Date | null>(null);
      const [endDate, setEndDate] = useState<Date | null>(null);
      const [showCalendar, setShowCalendar] = useState(false);

      const handleDateSelect = (date: Date) => {
        if (!startDate) {
          setStartDate(date);
        } else if (!endDate && date > startDate) {
          setEndDate(date);
          setShowCalendar(false);
          onDateChange({ startDate, endDate: date });
        } else {
          setStartDate(date);
          setEndDate(null);
        }
      };

      const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        onDateChange({ startDate: null, endDate: null });
      };

      return (
        <div className="relative">
          <Button variant="secondary" size="sm" onClick={() => setShowCalendar(!showCalendar)}>
            {startDate && endDate
              ? `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`
              : 'Select Date Range'}
          </Button>
          {showCalendar && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md mt-1 p-4">
              {/* Placeholder for a date picker component */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-[#777A55]">Select a Date Range</h3>
                <Button variant="ghost" size="sm" onClick={handleClear}>Clear</Button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <Button
                    key={day}
                    variant={
                      startDate &&
                      endDate &&
                      day >= startDate.getDate() &&
                      day <= endDate.getDate()
                        ? 'primary'
                        : 'secondary'
                    }
                    size="sm"
                    onClick={() => handleDateSelect(new Date(2025, 0, day))}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };
