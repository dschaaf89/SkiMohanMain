import React from 'react';

interface TickerProps {
  messages: string[];
}

const Ticker: React.FC<TickerProps> = ({ messages }) => {
  return (
    <div className="overflow-hidden bg-red-700 text-white font-bold h-14 sm:h-16 md:h-18 lg:h-20 flex items-center">
      <div className="animate-marquee-left-to-right flex space-x-6">
        {messages.map((message, index) => (
          <span
            key={index}
            className="mx-4 uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl whitespace-nowrap"
          >
            {message} <span className="text-3xl sm:text-4xl">❄</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
