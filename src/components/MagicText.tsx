'use client';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';

interface MagicText {
  text: string;
}

export default function MagicText() {
  const [texts, setTexts] = useState<MagicText[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reference to the magicMirrorText in Firebase
    const textRef = ref(db, 'magicMirrorText');

    // Listen for changes in real-time
    const unsubscribe = onValue(textRef, (snapshot) => {
      if (snapshot.exists()) {
        const textData = snapshot.val();
        // Convert object to array
        const textArray = Object.values(textData);
        setTexts(textArray as MagicText[]);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (texts.length === 0) return;

    // Change text every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [texts]);

  if (texts.length === 0) return null;

  return (
    <div className="fixed bottom-32 left-0 right-0 text-center">
      <div className="text-white text-6xl font-light animate-fade-in">
        {texts[currentIndex]?.text}
      </div>
    </div>
  );
}
