import React, { useState, useEffect } from 'react';
import { Cloud, Thermometer, Droplets, Wind, MapPin, RefreshCw, AlertCircle } from 'lucide-react';

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

interface Destination {
  nom: string;
  climate: string;
  pays: string;
}

interface WeatherClimateProps {
  destination: Destination;
}

export default function WeatherClimate({ destination }: WeatherClimateProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    
    try {
      // Simuler l'appel API avec données fictives pour la démo
      // Dans votre projet, remplacez par: const response = await fetch(`/api/weather?city=${destination.nom}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler délai réseau
      
      // Données météo simulées basées sur le climat de la destination
      const mockWeatherData: WeatherData = {
        temperature: destination.climate === 'tropical' ? 28 : 
                    destination.climate === 'subarctic' ? -2 : 15,
        condition: destination.climate === 'tropical' ? 'sunny' : 
                  destination.climate === 'subarctic' ? 'snow' : 'cloudy',
        humidity: destination.climate === 'tropical' ? 80 : 65,
        windSpeed: 12,
        description: destination.climate === 'tropical' ? 'Ensoleillé et chaud' : 
                    destination.climate === 'subarctic' ? 'Neige légère' : 'Nuageux',
        icon: '01d',
        isRaining: Math.random() > 0.7,
        recommendations: destination.climate === 'tropical' ? 
          ['🧴 Crème solaire indispensable', '💧 Beaucoup d\'eau', '👕 Vêtements légers'] :
          destination.climate === 'subarctic' ? 
          ['🧥 Manteau chaud indispensable', '🧤 Gants et bonnet', '👢 Chaussures chaudes'] :
          ['🧥 Veste recommandée', '☂️ Parapluie au cas où']
      };
      
      setWeather(mockWeatherData);
      setLastUpdate(new Date());
      
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [destination.nom]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'cloudy':
      case 'overcast':
        return '☁️';
      case 'rain':
      case 'drizzle':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      default:
        return '🌤️';
    }
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'À l\'instant';
    if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    return `Il y a ${diffHours}h`;
  };

  // État de chargement
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center mb-3">
          <RefreshCw size={20} className="text-blue-600 mr-2 animate-spin" />
          <h3 className="font-semibold text-blue-800">Chargement météo...</h3>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-blue-200 rounded-full w-3/4 animate-pulse"></div>
          <div className="h-3 bg-blue-200 rounded-full w-1/2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // État d'erreur - Fallback vers climat statique
  if (error || !weather) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Cloud size={20} className="text-gray-600 mr-2" />
            <h3 className="font-semibold text-gray-700">Climat</h3>
          </div>
          <button
            onClick={fetchWeather}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="Réessayer"
          >
            <RefreshCw size={16} />
          </button>
        </div>
        <p className="text-gray-600 capitalize mb-2">{destination.climate}</p>
        {error && (
          <div className="flex items-center text-sm text-amber-600">
            <AlertCircle size={14} className="mr-1" />
            <span>Données météo indisponibles</span>
          </div>
        )}
      </div>
    );
  }

  // Affichage normal avec données météo
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Cloud size={20} className="text-blue-600 mr-2" />
          <h3 className="font-semibold text-blue-800">Météo Actuelle</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-xs text-blue-600">
            <MapPin size={12} className="mr-1" />
            <span>{destination.nom}</span>
          </div>
          <button
            onClick={fetchWeather}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            title="Actualiser"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>
      
      {/* Température principale */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <span className="text-3xl mr-2">{getWeatherIcon(weather.condition)}</span>
          <div>
            <div className="flex items-center">
              <Thermometer size={18} className="text-red-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800">{weather.temperature}°C</span>
            </div>
            <p className="text-gray-600 capitalize text-sm">{weather.description}</p>
          </div>
        </div>
      </div>
      
      {/* Détails météo */}
      <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
        <div className="flex items-center">
          <Droplets size={14} className="text-blue-500 mr-1" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center">
          <Wind size={14} className="text-gray-500 mr-1" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <div className="text-xs">
          {lastUpdate && formatLastUpdate(lastUpdate)}
        </div>
      </div>

      {/* Indicateur de pluie */}
      {weather.isRaining && (
        <div className="bg-blue-100 border border-blue-200 rounded p-2 mb-3">
          <div className="flex items-center text-blue-700 text-sm">
            <span className="mr-2">🌧️</span>
            <span>Pluie en cours</span>
          </div>
        </div>
      )}

      {/* Recommandations */}
      {weather.recommendations && weather.recommendations.length > 0 && (
        <div className="border-t border-blue-200 pt-3">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Recommandations :</h4>
          <div className="space-y-1">
            {weather.recommendations.slice(0, 2).map((rec, index) => (
              <div key={index} className="text-xs text-blue-700 flex items-center">
                <span className="mr-1">•</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

 
 