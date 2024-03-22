import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface WeatherData {
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
}

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const latitude = 47.3928;
    const longitude = -121.4009;
    const url = `http://api.weatherapi.com/v1/current.json?key=f0c50889a48f431db6d194531241503&q=${latitude},${longitude}`;

    axios.get(url)
      .then(response => {
        setWeatherData(response.data.current);
      })
      .catch(err => {
        setError('There was an error fetching the weather data!');
        console.error('There was an error!', err);
      });
  }, []);

  return (
    <div>
      <p className="text-black mb-4 text-2xl text-center font-bold ">Pass Conditions</p>
      {error && <p>Error: {error}</p>}
      {weatherData ? (
        <div className="text-center">
          <p className="text-black text-2xl font-bold">Current Temperature: {weatherData.temp_f}°F</p>
          <p className="text-black text-2xl font-bold">Weather Conditions: {weatherData.condition.text}</p>
          <Image
            src={`https:${weatherData.condition.icon}`}
            alt="Weather Icon"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherWidget;
