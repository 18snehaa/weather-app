import React, { useState } from 'react';
import './App.css';
import { WiDaySunny, WiRain, WiCloudy, WiHumidity } from 'react-icons/wi';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const backgroundImages = {
    mumbai: '/images/mumbai.jpg',
    delhi: '/images/delhi.jpg',
    pune: '/images/pune.jpg',
    kolkata: '/images/kolkata.jpg',
    bengaluru: '/images/bengaluru.jpg',
    hyderabad: '/images/hyderabad.jpg',
    chennai: '/images/chennai.jpg',
    satara: '/images/satara.jpg',
    kolhapur: '/images/kolhapur.jpg',
    sangli: '/images/sangli.jpg',
  };

  const defaultImage = '/images/default.jpg';

  const backgroundImage = backgroundImages[city.toLowerCase()] || defaultImage;

  const getWeather = async () => {
    if (!city) return;
    setIsLoading(true);
    try {
      const apiKey = 'ae7ef6ba41ff3829d163b4f6eb0f7554'; // Replace with your OpenWeatherMap API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmoji = (desc) => {
    if (!desc) return '🌈';
    const d = desc.toLowerCase();
    if (d.includes('rain')) return '🌧️';
    if (d.includes('cloud')) return '☁️';
    if (d.includes('sun') || d.includes('clear')) return '☀️';
    if (d.includes('mist') || d.includes('fog')) return '🌫️';
    return '🌡️';
  };

  return (
    <div
      className="weather-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(0px)',
        position: 'relative',
      }}
    >
      <div className="overlay" />
      <div className="content-box">
        <h1 className="title">🌦️ Weather App</h1>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="dropdown"
        >
          <option value="">Select City</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Pune">Pune</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Satara">Satara</option>
          <option value="Kolhapur">Kolhapur</option>
          <option value="Sangli">Sangli</option>
        </select>

        <button onClick={getWeather}>Get Weather</button>

        {isLoading && <p>Loading...</p>}

        {weather && weather.main && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>
              {getEmoji(weather.weather[0].description)}{' '}
              {weather.weather[0].main} ({weather.weather[0].description})
            </p>
            <p>
              <WiDaySunny /> Temperature: {weather.main.temp} °C
            </p>
            <p>
              <WiHumidity /> Humidity: {weather.main.humidity} %
            </p>
            <p>
              <WiCloudy /> Wind: {weather.wind.speed} m/s
            </p>
            {weather.weather[0].main.toLowerCase().includes('rain') && (
              <p>🌧️ It is currently raining!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
