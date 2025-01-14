'use client';
import { useState, useEffect } from 'react';

export default function Calendar() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white">
      <div className="text-3xl font-light">
        {date.toLocaleDateString(undefined, { weekday: 'long' })}
      </div>
      <div className="text-xl">
        {date.toLocaleDateString(undefined, { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
}
