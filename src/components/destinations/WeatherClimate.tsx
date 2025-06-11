"use client";

import React, { useState, useEffect } from 'react';
import { Cloud, Thermometer, Droplets, Wind, MapPin, Loader } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  isRaining: boolean;
  recommendations: string[];
  location?: {
    name: string;
    country: string;
  };
}

interface WeatherClimatProps {
  city: string;
  className?: string;
}

const WeatherClimat: React.FC<WeatherClimatProps> = ({ city, className = "" }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const fetchWeatherData = async () => {
    if (!city) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des données météo');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur météo:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return '☀️';
      case 'partly-cloudy':
        return '⛅';
      case 'cloudy':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'drizzle':
        return '🌦️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      case 'fog':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        <div className="flex items-center justify-center">
          <Loader className="animate-spin h-8 w-8 text-primary-600 mr-2" />
          <span className="text-gray-600">Chargement des données météo...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        <div className="text-center">
          <Cloud className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-red-600 mb-2">Erreur météo</p>
          <p className="text-gray-600 text-sm">{error}</p>
          <button 
            onClick={fetchWeatherData}
            className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        <div className="text-center text-gray-500">
          Aucune donnée météo disponible
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {/* En-tête avec localisation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-primary-600 mr-2" />
          <div>
            <h3 className="font-semibold text-secondary-700">
              {weatherData.location?.name || city}
            </h3>
            {weatherData.location?.country && (
              <p className="text-sm text-gray-500">{weatherData.location.country}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl mb-1">{getWeatherIcon(weatherData.condition)}</div>
        </div>
      </div>

      {/* Température principale */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-secondary-600 mb-2">
          {weatherData.temperature}°C
        </div>
        <p className="text-gray-600 capitalize">{weatherData.description}</p>
      </div>

      {/* Détails météorologiques */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <p className="text-sm text-gray-600">Humidité</p>
          <p className="font-semibold">{weatherData.humidity}%</p>
        </div>
        <div className="text-center">
          <Wind className="h-5 w-5 text-gray-500 mx-auto mb-1" />
          <p className="text-sm text-gray-600">Vent</p>
          <p className="font-semibold">{weatherData.windSpeed} km/h</p>
        </div>
        <div className="text-center">
          <Thermometer className="h-5 w-5 text-red-500 mx-auto mb-1" />
          <p className="text-sm text-gray-600">Ressenti</p>
          <p className="font-semibold">{weatherData.temperature}°C</p>
        </div>
      </div>

      {/* Recommandations */}
      {weatherData.recommendations.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-semibold text-secondary-700 mb-3">
            Recommandations
          </h4>
          <div className="space-y-2">
            {weatherData.recommendations.slice(0, 3).map((recommendation, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-2 flex-shrink-0"></div>
                <span>{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherClimat;