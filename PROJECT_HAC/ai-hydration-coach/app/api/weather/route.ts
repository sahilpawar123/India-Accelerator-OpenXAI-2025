import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return new NextResponse('Weather API key not found', { status: 500 });
  }

  const city = "London"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data from OpenWeatherMap');
    }
    const data = await response.json();
    const temperature = data.main.temp;
    
    return NextResponse.json({ temperature });
  } catch (error) {
    console.error("Weather API error:", error);
    return new NextResponse('Error fetching weather', { status: 500 });
  }
}