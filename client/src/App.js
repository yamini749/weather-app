import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true); // Show loading spinner
    try {
      const response = await axios.get(http://localhost:5000/api/weather?city=${city});
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;