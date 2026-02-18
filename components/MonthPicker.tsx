
import React from 'react';

interface MonthPickerProps {
  value: string;
  onChange: (val: string) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white/10 p-1.5 rounded-lg border border-white/20">
      <label className="text-xs font-medium uppercase tracking-wider hidden sm:inline">মাস নির্বাচন করুন:</label>
      <input 
        type="month" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-white focus:outline-none cursor-pointer text-sm sm:text-base font-semibold"
      />
    </div>
  );
};

export default MonthPicker;
