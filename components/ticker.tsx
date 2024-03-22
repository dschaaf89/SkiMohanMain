// components/TickerBanner.js

import React from 'react';
interface TickerProps {
  messages: string[];
}
const Ticker: React.FC<TickerProps> = ({ messages }) => {
  return (
    <div className="overflow-hidden bg-gray-700 text-white h-12 flex items-center">
       <div className="animate-marquee-left-to-right flex space-x-4">
        {messages.map((message, index) => (
          <span key={index} className="mx-4">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
