
import React from 'react';

interface CurrencyIconProps {
  className?: string;
}

const CurrencyIcon: React.FC<CurrencyIconProps> = ({ className = "w-5 h-5" }) => {
  return (
    <span className={`inline-flex items-center align-middle ${className} mr-1`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M12.42 27.56V4.44h4.74c2.24 0 4.09.28 5.56.84a8.68 8.68 0 0 1 3.73 2.58c.95 1.15 1.43 2.65 1.43 4.5V19.64c0 1.85-.48 3.35-1.43 4.5a8.68 8.68 0 0 1-3.73 2.58c-1.47.56-3.32.84-5.56.84h-4.74zM16.5 7.16v17.68h.66c1.8 0 3.22-.19 4.25-.56a5.1 5.1 0 0 0 2.45-1.84c.6-.78.9-1.93.9-3.46v-5.96c0-1.53-.3-2.68-.9-3.46a5.1 5.1 0 0 0-2.45-1.84c-1.03-.37-2.45-.56-4.25-.56h-.66z" fill="currentColor"/>
        <path d="M8.5 13.5h19v1.5h-19v-1.5zM8.5 17h19v1.5h-19v-1.5z" fill="currentColor"/>
      </svg>
    </span>
  );
};

export default CurrencyIcon;
