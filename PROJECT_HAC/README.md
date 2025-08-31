💧 AI Hydration Coach
A smart, personalized water intake reminder that uses AI to provide motivation and help you build healthy hydration habits.

Features
🥤 Smart Tracking
Daily Goal Setting: Users can set a personalized daily water intake goal.

Visual Progress: An animated water bottle fills up in real-time as you log your intake.

Data Persistence: All progress, including goals, streaks, and points, is saved in the browser's localStorage.

🤖 AI-Powered Coach
Intelligent Nudges: Connects to a local Ollama model (Llama 3) to generate unique, motivating messages.

Context-Aware Advice: The AI considers your progress, the time of day, and even the local weather to provide relevant and timely advice.

✨ Gamification & Rewards
Points System: Earn points for drinking water and completing your daily goal.

Streak Counter: Tracks your consistency with a multi-day streak counter.

Unlockable Badges: Earn badges like "First Splash" and "Hydration Hero" for reaching milestones.

Celebration Animation: A fun confetti animation appears when you complete your daily goal.

⏰ Proactive Reminders
Smart Countdown Timer: A personalized timer calculates the optimal time for your next drink based on your goal and waking hours.

Desktop Notifications: Uses a Service Worker to send native browser notifications that work even when the app is in the background.

🚀 Getting Started
Installation
Clone the forked repository:

 

Bash

cd ai-hydration-coach
Install dependencies:

Bash

npm install
Create a .env.local file in the root of the project and add your OpenWeatherMap API key:

OPENWEATHER_API_KEY=your_api_key_here
Run the development server:

Bash

npm run dev
Open http://localhost:3000 with your browser to see the result.

📁 Project Structure
ai-hydration-coach/
├── app/
│   ├── api/
│   │   ├── nudge/
│   │   │   └── route.ts         # AI nudge generation logic
│   │   └── weather/
│   │       └── route.ts         # Weather data fetching
│   ├── components/
│   │   ├── ParticlesBackground.tsx # Animated background
│   │   ├── Settings.tsx         # Settings modal component
│   │   └── WaterBottle.tsx      # Animated water bottle SVG
│   ├── globals.css              # Global styles & Tailwind directives
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application UI and logic
├── public/
│   ├── logo.png                 # App logo
│   └── service-worker.js        # Background notification script
├── package.json                 # Dependencies and scripts
└── tailwind.config.ts           # Tailwind CSS configuration
🎯 How to Use
Set Your Goal: Open the settings (⚙️ icon) to set your daily water goal and wake-up time.

Enable Notifications: In the settings, click "Enable Notifications" and allow the browser permission.

Track Your Intake: Click the "+250 ml" or "+500 ml" buttons to log your water intake.

Watch Your Progress: See the water bottle fill up and your intake numbers increase.

Get AI Nudges: After logging a drink, the AI will provide a smart, personalized tip.

Stay on Schedule: The countdown timer will show you when to drink next and send a desktop notification.

View Achievements: Switch to the "Achievements" view to see your points, streak, and earned badges.

🤖 AI Model
This project uses Ollama with the llama3:latest model for all AI operations. Make sure you have Ollama installed and the model downloaded:

Bash

ollama pull llama3:latest
🛠 Dependencies
Next.js 14: React framework

TypeScript: Type safety

Tailwind CSS: Styling

Ollama: Local AI model integration

Framer Motion: Animations

react-confetti: Celebration animation

@tsparticles/react: Animated background

react-hot-toast: In-app notifications

react-clock: Analog clock display