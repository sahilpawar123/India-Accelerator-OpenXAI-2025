"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from 'react-confetti';
import Settings from './components/Settings';
import WaterBottle from './components/WaterBottle';
import Image from 'next/image';
import toast from "react-hot-toast";

const BADGES = {
  FIRST_SPLASH: { name: "First Splash", emoji: "💧", description: "First day complete!" },
  HYDRATION_HERO: { name: "Hydration Hero", emoji: "🦸", description: "7-day streak!" },
  AQUA_MASTER: { name: "Aqua Master", emoji: "🏆", description: "30-day streak!" },
};

function Stopwatch({ time }: { time: string }) {
  return (
    <div className="text-center">
      <p className="text-slate-400 text-sm">Next drink in:</p>
      <p className="text-4xl font-bold text-cyan-300 tracking-widest">{time}</p>
    </div>
  );
}

export default function Home() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal, setGoal] = useState(2000);
  const [aiNudge, setAiNudge] = useState("Click a button to get your first smart nudge!");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoalComplete, setIsGoalComplete] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [points, setPoints] = useState(0);
  const [wakeTime, setWakeTime] = useState(7);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [countdown, setCountdown] = useState("00:00");
  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedLastDate = localStorage.getItem('lastCompletedDate');

    const savedGoal = localStorage.getItem('dailyGoal');
    const savedPoints = localStorage.getItem('userPoints');
    const savedWakeTime = localStorage.getItem('wakeTime');
    const savedStreak = localStorage.getItem('streak');
    const savedBadges = localStorage.getItem('badges');
    
    if (savedGoal) setGoal(JSON.parse(savedGoal));
    if (savedPoints) setPoints(JSON.parse(savedPoints));
    if (savedWakeTime) setWakeTime(JSON.parse(savedWakeTime));
    if (savedStreak) setStreak(JSON.parse(savedStreak));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
    if (savedLastDate) setLastCompletedDate(savedLastDate);

    if (savedLastDate !== today) {
      setWaterIntake(0);
      localStorage.setItem('waterIntake', '0');
    } else {
      const savedIntake = localStorage.getItem('waterIntake');
      if (savedIntake) setWaterIntake(JSON.parse(savedIntake));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
    localStorage.setItem('dailyGoal', JSON.stringify(goal));
    localStorage.setItem('userPoints', JSON.stringify(points));
    localStorage.setItem('wakeTime', JSON.stringify(wakeTime));
    localStorage.setItem('streak', JSON.stringify(streak));
    localStorage.setItem('badges', JSON.stringify(badges));
    if(lastCompletedDate) {
      localStorage.setItem('lastCompletedDate', lastCompletedDate);
    }
  }, [waterIntake, goal, points, wakeTime, streak, badges, lastCompletedDate]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    if (goal > 0 && waterIntake >= goal && lastCompletedDate !== today) {
      setIsGoalComplete(true);
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      setPoints(prevPoints => prevPoints + 100 + (newStreak * 10));
      setLastCompletedDate(today);

      let newBadges = [...badges];
      if (newStreak === 1 && !badges.includes("FIRST_SPLASH")) newBadges.push("FIRST_SPLASH");
      if (newStreak >= 7 && !badges.includes("HYDRATION_HERO")) newBadges.push("HYDRATION_HERO");
      if (newStreak >= 30 && !badges.includes("AQUA_MASTER")) newBadges.push("AQUA_MASTER");
      setBadges(newBadges);

      setGoal(prevGoal => prevGoal + 250);

      setTimeout(() => setIsGoalComplete(false), 8000);
    }
  }, [waterIntake, goal, lastCompletedDate, streak, badges, points]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      if (goal <= 0) {
        setCountdown("Set a goal!");
        return;
      }
      if (currentHour < wakeTime) {
        setCountdown("Not yet...");
        return;
      }
      const wakingHours = 16;
      const drinksNeeded = Math.ceil(goal / 250);
      const intervalMinutes = drinksNeeded > 0 ? (wakingHours * 60) / drinksNeeded : Infinity;
      const minutesSinceWaking = (currentHour - wakeTime) * 60 + now.getMinutes();
      const intervalsPassed = Math.floor(minutesSinceWaking / intervalMinutes);
      const nextDrinkTime = new Date();
      nextDrinkTime.setHours(wakeTime, 0, 0, 0);
      nextDrinkTime.setMinutes(nextDrinkTime.getMinutes() + (intervalsPassed + 1) * intervalMinutes);
      const diff = nextDrinkTime.getTime() - now.getTime();
      
      if (waterIntake >= goal) {
        setCountdown("Done!");
        return;
      }

      if (diff <= 1000 && diff > 0) {
        toast("💧 Time for your next glass of water!", {
          icon: '💧',
          style: {
            background: '#334155',
            color: '#ffffff',
          },
        });
      }

      if (diff <= 0) {
        setCountdown("00:00");
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      if (hours > 0) {
        setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      } else {
        setCountdown(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [goal, wakeTime, waterIntake]);

  const getAiNudge = async (currentIntake: number) => {
    setIsLoading(true);
    try {
      const currentHour = new Date().getHours();
      const response = await fetch('/api/nudge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ waterIntake: currentIntake, goal, timeOfDay: currentHour }),
      });
      const data = await response.json();
      setAiNudge(data.message);
    } catch (error) {
      console.error("Failed to fetch AI nudge:", error);
      setAiNudge("Could not get a nudge. Keep going!");
    }
    setIsLoading(false);
  };

  const addWater = (ml: number) => {
    const newIntake = waterIntake + ml;
    setWaterIntake(newIntake);
    getAiNudge(newIntake);
  };

  const handleSaveSettings = (newGoal: number, newWakeTime: number) => {
    setGoal(newGoal);
    setWakeTime(newWakeTime);
  };

  const handleDailyReset = () => {
    setWaterIntake(0);
    localStorage.setItem('waterIntake', '0');
    setAiNudge("Progress reset for the day! Let's get started.");
  };

  const handleHardReset = () => {
    setWaterIntake(0);
    setPoints(0);
    setStreak(0);
    setBadges([]);
    setGoal(2000);
    setWakeTime(7);
    localStorage.clear();
    setShowSettings(false);
    setAiNudge("Everything has been reset. Ready for a new start!");
  };

  const percentage = goal > 0 ? Math.min((waterIntake / goal) * 100, 100) : 0;

  return (
    <>
     <main className="flex items-center justify-center min-h-screen text-white p-4 overflow-hidden">
        {isGoalComplete && <Confetti />}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-8 w-full max-w-md text-center relative flex flex-col justify-between min-h-[700px]"
        >
          <div>
            <div className="absolute top-4 left-4">
              <Image src="/logo.png" alt="Logo" width={100} height={25} priority />
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-4">
              <button onClick={handleDailyReset} className="text-slate-400 hover:text-white transition text-2xl" title="Reset Daily Progress">🔄</button>
              <button onClick={() => setShowSettings(true)} className="text-slate-400 hover:text-white transition text-2xl">⚙️</button>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeView === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                  <Stopwatch time={countdown} />
                  <WaterBottle percentage={percentage} />
                  <p className="text-slate-200 font-medium my-6 text-lg">You’ve had <span className="text-cyan-300 font-bold text-2xl">{waterIntake}</span> ml today.</p>
                  <div className="flex justify-center gap-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => addWater(250)} className="bg-cyan-500 text-white font-semibold px-5 py-2 rounded-lg shadow-lg" disabled={isLoading}>+250 ml</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => addWater(500)} className="bg-teal-500 text-white font-semibold px-5 py-2 rounded-lg shadow-lg" disabled={isLoading}>+500 ml</motion.button>
                  </div>
                  <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg min-h-[90px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.p key={aiNudge} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="text-cyan-200 italic">
                        {isLoading ? "Getting a smart tip..." : `"${aiNudge}"`}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {activeView === 'achievements' && (
                <motion.div key="achievements" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                  <h2 className="text-2xl font-bold text-cyan-400 mb-6">Achievements</h2>
                  <div className="flex justify-around items-center text-center mb-6">
                    <div>
                      <p className="text-yellow-400 font-bold text-4xl">💎 {points}</p>
                      <p className="text-slate-400 text-sm">Total Points</p>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-bold text-4xl">🔥 {streak}</p>
                      <p className="text-slate-400 text-sm">Day Streak</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-300 mb-2">My Badges</h3>
                    <div className="flex justify-center gap-4 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                      {Object.keys(BADGES).map((key) => {
                        const badge = BADGES[key as keyof typeof BADGES];
                        const isEarned = badges.includes(key);
                        return (
                          <div key={key} className="text-center" title={`${badge.name}: ${badge.description}`}>
                            <div className={`text-5xl transition-all duration-300 ${isEarned ? 'grayscale-0' : 'grayscale opacity-30'}`}>{badge.emoji}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-slate-700 pt-4 flex justify-around">
            <button onClick={() => setActiveView('home')} className={`font-semibold transition text-lg ${activeView === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Home</button>
            <button onClick={() => setActiveView('achievements')} className={`font-semibold transition text-lg ${activeView === 'achievements' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Achievements</button>
          </div>
        </motion.div>
      </main>
      <AnimatePresence>
        {showSettings && (<Settings currentGoal={goal} currentWakeTime={wakeTime} onClose={() => setShowSettings(false)} onSave={handleSaveSettings} onHardReset={handleHardReset} />)}
      </AnimatePresence>
    </>
  );
}