import Clock from '../components/Clock';
import Weather from '../components/Weather';
import CollegeCalendar from '../components/GoogleCalendar';
import MagicText from '../components/MagicText';
import './animations.css';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 relative">
      <div className="flex justify-between">
        {/* Left section with Clock and Calendar */}
        <div className="flex flex-col gap-8">
          <Clock />
          <CollegeCalendar />
        </div>

        {/* Right section with Weather */}
        <Weather />
      </div>

      {/* Magic Text at bottom */}
      <MagicText />
    </main>
  );
}
