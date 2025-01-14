'use client';
import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="text-white text-8xl font-light">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
      </div>
      <div className="text-white text-2xl font-light">
        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}
