import React from 'react';

interface TickerProps {
  messages: string[];
}

const Ticker: React.FC<TickerProps> = ({ messages }) => {
  return (
    <div className="overflow-hidden bg-red-700 text-white font-bold h-12 flex items-center">
      <div className="animate-marquee-left-to-right flex space-x-4">
        {messages.map((message, index) => (
          <span key={index} className="mx-4 uppercase">
            {message} <span className="text-5xl">❄</span> {/* Adjust the text size */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
