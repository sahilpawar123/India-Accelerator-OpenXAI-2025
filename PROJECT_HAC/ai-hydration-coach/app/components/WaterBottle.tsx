"use client";
import { motion } from "framer-motion";

interface WaterBottleProps {
  percentage: number;
}

export default function WaterBottle({ percentage }: WaterBottleProps) {
  return (
    <div className="relative w-24 h-48 mx-auto mb-6">
      <svg
        viewBox="0 0 100 200"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 200H80V40C80 28.9543 71.0457 20 60 20H40C28.9543 20 20 28.9543 20 40V200Z"
          className="stroke-slate-600"
          strokeWidth="4"
        />
        <path
          d="M10 45H90"
          className="stroke-slate-600"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M35 10H65C67.7614 10 70 12.2386 70 15V20H30V15C30 12.2386 32.2386 10 35 10Z"
          className="fill-slate-700"
        />
      </svg>
      <motion.div
        className="absolute bottom-0 w-full rounded-b-xl"
        style={{
          left: '10%',
          right: '10%',
          width: '80%',
          bottom: '10%',
          height: `calc(70% * ${percentage / 100})`,
          backgroundColor: '#22d3ee',
          opacity: 0.75,
        }}
        initial={{ height: 0 }}
        animate={{ height: `calc(70% * ${percentage / 100})` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}