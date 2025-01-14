'use client';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';

interface Program {
  id: string;
  title: string;
  date: string;
  timestamp: number;
}

const CalendarIcon = () => (
  <svg 
    className="w-5 h-5 text-white/70" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
  </svg>
);

export default function CollegeCalendar() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    // Reference to the programs in Firebase
    const programsRef = ref(db, 'programs');

    // Listen for changes in real-time
    const unsubscribe = onValue(programsRef, (snapshot) => {
      if (snapshot.exists()) {
        const programsData = snapshot.val();
        // Convert object to array and sort by timestamp
        const programsArray = Object.entries(programsData)
          .map(([id, data]: [string, any]) => ({
            id,
            ...data
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setPrograms(programsArray);
      } else {
        setPrograms([]);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <div className="text-white">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-3xl font-light mb-1">College Programs</h2>
        <div className="h-px bg-white/30 "></div>
      </div>

      {/* Programs */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="text-xl font-light">Loading programs...</div>
        ) : programs.length > 0 ? (
          programs.map((program) => (
            <div key={program.id} className="flex items-center gap-4">
              <CalendarIcon />
              <div className="text-xl font-light w-full">
                {formatDate(program.date)}
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-light">{program.title}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl font-light">No upcoming programs</div>
        )}
      </div>
    </div>
  );
}
