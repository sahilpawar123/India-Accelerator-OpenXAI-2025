import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { waterIntake, goal, timeOfDay } = await request.json();

    // 1. Fetch the current temperature from our own weather API
    let weatherContext = "";
    try {
      // NOTE: This URL must be the full localhost address when calling from the server
      const weatherResponse = await fetch(`http://localhost:3000/api/weather`);
      
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        const temp = Math.round(weatherData.temperature);
        if (temp > 25) {
          weatherContext = `It is a hot day at ${temp}°C.`;
        } else if (temp < 10) {
          weatherContext = `It is a cold day at ${temp}°C.`;
        } else {
          weatherContext = `The temperature is a pleasant ${temp}°C.`;
        }
      }
    } catch (e) {
      console.error("Could not fetch weather for AI nudge", e);
      // If fetching weather fails, we can just continue without it
      weatherContext = "The weather is unknown.";
    }
    
    // 2. Determine the part of the day
    let dayPart = "during the day";
    if (timeOfDay >= 5 && timeOfDay < 12) {
      dayPart = "in the morning";
    } else if (timeOfDay >= 12 && timeOfDay < 17) {
      dayPart = "in the afternoon";
    } else if (timeOfDay >= 17 && timeOfDay < 21) {
      dayPart = "in the evening";
    } else {
      dayPart = "late at night";
    }

    // 3. Create the full prompt for the AI
    const prompt = `
      You are a friendly and encouraging health coach.
      A user's daily water intake goal is ${goal} ml.
      They have currently had ${waterIntake} ml.
      It is currently ${dayPart}.
      ${weatherContext}
      Write a short, creative, and motivating nudge (no more than 20 words) that is relevant to the user's progress, the time of day, and the weather.
      Do not include the current intake or goal in your response.
    `;

    // 4. Send the prompt to the local Ollama server
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3:latest',
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Ollama');
    }

    const data = await response.json();
    const aiNudge = data.response;

    // 5. Send the AI's response back to the frontend
    return NextResponse.json({ message: aiNudge });

  } catch (error) {
    console.error(error);
    return new NextResponse('Error generating nudge', { status: 500 });
  }
}