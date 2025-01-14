import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAITY47zm554EhZphnIYQO6GFQivenJ4qw",
  authDomain: "magic-mirror-d8667.firebaseapp.com",
  databaseURL: "https://magic-mirror-d8667-default-rtdb.firebaseio.com",
  projectId: "magic-mirror-d8667",
  storageBucket: "magic-mirror-d8667.firebasestorage.app",
  messagingSenderId: "1081967049681",
  appId: "1:1081967049681:web:d52512077edd7b7f153ef0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Realtime Database instance
export const db = getDatabase(app);
