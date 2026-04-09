import { useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./components/Footer";

function Weather_App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "b8a0dfc4d74fdc5bfffbd9f581e2bdc5";

  const getBackground = () => {
    if (!weather)
      return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";

    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("cloud"))
      return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80";
    if (condition.includes("rain"))
      return "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1920&q=80";
    if (condition.includes("clear"))
      return "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&w=1920&q=80";
    if (condition.includes("snow"))
      return "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80";
    if (condition.includes("haze") || condition.includes("mist"))
      return "https://images.unsplash.com/photo-1543968996-ee822b8176ba?auto=format&fit=crop&w=1920&q=80";

    return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";
  };

  const getWeather = (e) => {
    if (e) e.preventDefault();

    if (!city) {
      alert("Please enter a city!");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      )
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("City not found!"); // 👈 simple alert
        setError("City not found!");
        setLoading(false);
      });
  };

  return (
    <div
      className="app-wrapper"
      style={{ backgroundImage: `url(${getBackground()})` }}
    >
      <div className="glass-card animate-fade-in">
        <h2 className="brand-logo">
          WEATHER FORCAST <span className="pro-badge"></span>
        </h2>

        <form className="search-container" onSubmit={getWeather}>
          <input
            type="text"
            className="modern-input"
            placeholder="Search global city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="modern-btn">
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "EXPLORE"
            )}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}

        {weather && (
          <div className="weather-display animate-slide-up">
            <div className="weather-icon-box">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="weather icon"
              />
            </div>

            <div className="temp-section">
              <h1 className="main-temp">{Math.round(weather.main.temp)}°</h1>
              <p className="description">{weather.weather[0].description}</p>
            </div>

            <h3 className="location-text">
              {weather.name}, {weather.sys.country}
            </h3>

            <div className="info-grid">
              <div className="info-item">
                <small>FEELS LIKE</small>
                <p>{weather.main.feels_like}°C</p>
              </div>
              <div className="info-item border-line">
                <small>HUMIDITY</small>
                <p>{weather.main.humidity}%</p>
              </div>
              <div className="info-item">
                <small>WIND</small>
                <p>{weather.wind.speed} km/h</p>
                <Footer />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather_App;
