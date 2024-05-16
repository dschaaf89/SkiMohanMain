"use client";

import React, { useEffect, useState } from 'react';

const CalendarEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const hardcodedCalendarId = 'AAMkAGZjYThjYmRkLTM0ZDAtNDFmMi05ZDY2LTZmNDJhZGVkNDhmYQBGAAAAAAALehYChPLESpmu1mc5cfUfBwBEXQYZrvPSSoNf9DsdnZSiAAAAAAEGAABEXQYZrvPSSoNf9DsdnZSiAACaIcsHAAA='; // Replace this with your actual calendar ID

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/getCalendarEvents?calendarId=${hardcodedCalendarId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched events:', data); // Log the fetched events data
          setEvents(data);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [hardcodedCalendarId]);

  // Function to extract text from HTML
  const extractTextFromHtml = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options).toUpperCase().split(' ');
  };

  // Get today's date
  const today = new Date();

  // Filter and sort events to get the upcoming three events
  const upcomingEvents = [...events]
    .filter(event => new Date(event.start.dateTime) >= today)
    .sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime())
    .slice(0, 3);

  return (
    <div className="p-5 font-sans">
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((event, index) => {
          const [day, month] = formatDate(event.start?.dateTime);
          return (
            <div key={index} className="flex mb-5 p-5 bg-white border-l-4 border-blue-500 shadow-lg">
              <div className="flex flex-col items-center justify-center w-16 mr-4 bg-blue-500 text-white p-3 rounded-lg">
                <span className="text-3xl font-bold">{day}</span>
                <span className="text-lg">{month}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{event.subject}</h3>
                <p className="mb-2">
                  <span className="font-bold">Start Time: </span>
                  {new Date(event.start?.dateTime).toLocaleTimeString()}
                </p>
                <p>
                  <span className="font-bold">Description: </span>
                  {event.body?.content ? extractTextFromHtml(event.body.content) : 'No description available.'}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default CalendarEvents;
