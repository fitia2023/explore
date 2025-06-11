import { NextRequest, NextResponse } from "next/server";

// Plus besoin de clé API avec Open-Meteo !
const OPENMETEO_BASE_URL = "https://api.open-meteo.com/v1";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1";

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

// Fonction pour convertir le code météo Open-Meteo en condition
function getConditionFromWeatherCode(weatherCode: number): { condition: string; description: string; icon: string } {
  const weatherCodes: { [key: number]: { condition: string; description: string; icon: string } } = {
    0: { condition: "clear", description: "Ciel dégagé", icon: "01d" },
    1: { condition: "partly-cloudy", description: "Principalement dégagé", icon: "02d" },
    2: { condition: "partly-cloudy", description: "Partiellement nuageux", icon: "03d" },
    3: { condition: "cloudy", description: "Couvert", icon: "04d" },
    45: { condition: "fog", description: "Brouillard", icon: "50d" },
    48: { condition: "fog", description: "Brouillard givrant", icon: "50d" },
    51: { condition: "drizzle", description: "Bruine légère", icon: "09d" },
    53: { condition: "drizzle", description: "Bruine modérée", icon: "09d" },
    55: { condition: "drizzle", description: "Bruine dense", icon: "09d" },
    61: { condition: "rain", description: "Pluie légère", icon: "10d" },
    63: { condition: "rain", description: "Pluie modérée", icon: "10d" },
    65: { condition: "rain", description: "Pluie forte", icon: "10d" },
    71: { condition: "snow", description: "Chute de neige légère", icon: "13d" },
    73: { condition: "snow", description: "Chute de neige modérée", icon: "13d" },
    75: { condition: "snow", description: "Chute de neige forte", icon: "13d" },
    95: { condition: "thunderstorm", description: "Orage", icon: "11d" },
    96: { condition: "thunderstorm", description: "Orage avec grêle légère", icon: "11d" },
    99: { condition: "thunderstorm", description: "Orage avec grêle forte", icon: "11d" }
  };

  return weatherCodes[weatherCode] || weatherCodes[0];
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

// Fonction pour obtenir les coordonnées d'une ville
async function getCoordinates(city: string) {
  try {
    const geocodingResponse = await fetch(
      `${GEOCODING_URL}/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`
    );

    if (!geocodingResponse.ok) {
      throw new Error(`Geocoding API error: ${geocodingResponse.status}`);
    }

    const geocodingData = await geocodingResponse.json();
    
    if (!geocodingData.results || geocodingData.results.length === 0) {
      throw new Error(`Ville "${city}" non trouvée`);
    }

    const location = geocodingData.results[0];
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country
    };
  } catch (error) {
    throw new Error(`Erreur lors de la géolocalisation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
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

  try {
    // 1. Obtenir les coordonnées de la ville
    const coordinates = await getCoordinates(city);

    // 2. Appel à l'API Open-Meteo pour les données météorologiques
    const weatherResponse = await fetch(
      `${OPENMETEO_BASE_URL}/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache pendant 10 minutes
        next: { revalidate: 600 }
      }
    );

    if (!weatherResponse.ok) {
      throw new Error(`Open-Meteo API error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    
    // Extraction et formatage des données
    const current = weatherData.current;
    const temperature = Math.round(current.temperature_2m);
    const humidity = current.relative_humidity_2m;
    const windSpeed = current.wind_speed_10m;
    const weatherCode = current.weather_code;
    
    // Conversion du code météo
    const weatherInfo = getConditionFromWeatherCode(weatherCode);
    const condition = weatherInfo.condition;
    const description = weatherInfo.description;
    const icon = weatherInfo.icon;
    
    // Détection de la pluie/précipitations
    const isRaining = condition.includes('rain') || 
                     condition.includes('drizzle') || 
                     condition.includes('thunderstorm');
    
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

    return NextResponse.json({
      ...formattedWeatherData,
      location: {
        name: coordinates.name,
        country: coordinates.country
      }
    }, { status: 200 });

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