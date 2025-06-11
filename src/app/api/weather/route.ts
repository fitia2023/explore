// src/app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  isRaining: boolean;
  recommendations: string[];
}

function getWeatherRecommendations(temp: number, condition: string, isRaining: boolean): string[] {
  const recommendations: string[] = [];
  
  // Recommandations basées sur la température
  if (temp < 5) {
    recommendations.push("🧥 Manteau chaud indispensable");
    recommendations.push("🧤 Gants et bonnet recommandés");
    recommendations.push("🥾 Chaussures chaudes et antidérapantes");
  } else if (temp < 15) {
    recommendations.push("🧥 Veste ou pull chaud");
    recommendations.push("👕 Vêtements en couches");
  } else if (temp > 30) {
    recommendations.push("🧴 Crème solaire indispensable");
    recommendations.push("🧢 Chapeau ou casquette");
    recommendations.push("💧 Beaucoup d'eau");
    recommendations.push("👕 Vêtements légers et respirants");
  }

  // Recommandations basées sur les conditions météo
  if (isRaining) {
    recommendations.push("☂️ Parapluie ou imperméable");
    recommendations.push("👟 Chaussures imperméables");
    recommendations.push("🎒 Sac étanche pour protéger vos affaires");
  }

  if (condition.includes("wind")) {
    recommendations.push("🧥 Coupe-vent recommandé");
  }

  if (condition.includes("snow")) {
    recommendations.push("⛄ Équipement d'hiver complet");
    recommendations.push("👟 Chaussures antidérapantes");
  }

  return recommendations;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json(
      { error: "Weather API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Appel à l'API OpenWeatherMap
    const weatherResponse = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache pendant 10 minutes
        next: { revalidate: 600 }
      }
    );

    if (!weatherResponse.ok) {
      throw new Error(`OpenWeather API error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    
    // Extraction et formatage des données
    const temperature = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].main.toLowerCase();
    const description = weatherData.weather[0].description;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const icon = weatherData.weather[0].icon;
    
    // Détection de la pluie
    const isRaining = condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm');
    
    // Génération des recommandations
    const recommendations = getWeatherRecommendations(temperature, condition, isRaining);

    const formattedWeatherData: WeatherData = {
      temperature,
      condition,
      humidity,
      windSpeed,
      description,
      icon,
      isRaining,
      recommendations
    };

    return NextResponse.json(formattedWeatherData, { status: 200 });

  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}