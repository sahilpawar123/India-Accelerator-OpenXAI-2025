💧 AI Hydration Coach
🎥 Watch the Demo Video Here
Project Description
AI Hydration Coach is an intelligent web application designed to help users achieve their daily hydration goals. It goes beyond simple tracking by providing personalized, AI-generated nudges, a rewarding gamification system with points and badges, and a smart timer to make building healthy habits easy and engaging.

The Problem it Solves
Many people struggle to stay properly hydrated, often forgetting to drink water throughout their busy day. Standard reminder apps are generic and fail to keep users motivated over the long term. AI Hydration Coach solves this by providing a personalized and gamified experience that actively encourages users to meet their goals, adapting its advice to their progress, schedule, and even real-world conditions like the weather.

Features
AI-Powered Nudges: Connects to a local Ollama model (Llama 3) to generate smart, context-aware reminders based on the user's progress, the time of day, and even the local weather.

Dynamic UI: A sleek, modern, dark-themed interface built with Next.js and Tailwind CSS, featuring smooth animations from Framer Motion.

Gamification: Rewards users with points for completing their daily goals and tracks their multi-day streak to encourage consistency. It also includes unlockable badges for milestones.

Personalization: A settings panel allows users to set their own daily water goal and wake-up time.

Smart Timer: A personalized countdown timer calculates the optimal time for the user's next drink based on their goal and waking hours.

Data Persistence: Uses the browser's localStorage to save all user progress, goals, points, and streaks, so the data is there when they return.

Native Notifications: Uses a Service Worker to send desktop notifications that work even when the browser is in the background.

Animated Background: A subtle, interactive particle background to create a more immersive experience.

Tech Stack
Framework: Next.js (App Router)

Styling: Tailwind CSS

Animations: Framer Motion

AI Model: Ollama with Llama 3

Notifications: Browser Notification API & Service Worker

Additional Libraries: react-confetti, @tsparticles/react

Challenges Faced
Complex State Management: A key challenge was ensuring daily data like streaks and goal completions worked reliably with the browser's localStorage. We solved a critical bug in the daily reset logic to make the gamification features stable and consistent.

AI Integration: Integrating a local LLM (Ollama) with Next.js was a major challenge. This required building API routes to connect the frontend to the local AI and carefully designing prompts to get intelligent and motivating responses.

Background Notifications: Implementing true desktop notifications that work even when the browser is in the background required a deep dive into the browser's Service Worker and Notification APIs, including handling user permissions correctly.

How to Run Locally
Clone the repository.

Install dependencies: npm install

Set up your .env.local file with your OPENWEATHER_API_KEY.

Make sure your local Ollama server is running.

Start the development server: npm run dev