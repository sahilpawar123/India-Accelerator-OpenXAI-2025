"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface SettingsProps {
  currentGoal: number;
  currentWakeTime: number;
  onSave: (newGoal: number, newWakeTime: number) => void;
  onClose: () => void;
  onHardReset: () => void;
}

export default function Settings({ currentGoal, currentWakeTime, onSave, onClose, onHardReset }: SettingsProps) {
  const [newGoal, setNewGoal] = useState(currentGoal);
  const [newWakeTime, setNewWakeTime] = useState(currentWakeTime);

  const handleSave = () => {
    onSave(newGoal, newWakeTime);
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-sm text-white flex flex-col">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Settings</h2>
        <div className="mb-6">
          <label htmlFor="daily-goal" className="block text-slate-400 mb-2">Daily Water Goal (ml)</label>
          <input type="number" id="daily-goal" value={newGoal} onChange={(e) => setNewGoal(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
        </div>
        <div className="mb-6">
          <label htmlFor="wake-time" className="block text-slate-400 mb-2">I wake up at (24-hour format)</label>
          <input type="number" id="wake-time" value={newWakeTime} min="0" max="23" onChange={(e) => setNewWakeTime(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
        </div>
        <div className="flex justify-end gap-4 mt-auto">
          <button onClick={onClose} className="bg-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-600 transition">Cancel</button>
          <button onClick={handleSave} className="bg-cyan-500 font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600 transition">Save</button>
        </div>
        <div className="border-t border-slate-700 mt-6 pt-6">
           <button onClick={onHardReset} className="w-full bg-red-600/80 text-white font-semibold p-2 rounded-lg hover:bg-red-700 transition">Reset All Data</button>
           <p className="text-xs text-slate-500 mt-2">Warning: This will reset your goal, points, streak, and badges.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}