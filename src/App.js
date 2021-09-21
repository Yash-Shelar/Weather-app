import React, { useState } from "react";
import "./app.css";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "http://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  function timeBuilder(dt) {
    let time = new Date(dt);
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  const style = {
    width: "100vw",
    height: "100vh",
    backgroundImage: "url('/assets/warm.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div className="app" style={style}>
      <div className="transLayer">
        <main>
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search...."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyPress={search}
              className="search"
              spellCheck="false"
            />
          </div>
          {typeof weather.main !== "undefined" ? (
            <div className="weather">
              <div className="locationInfo">
                <h1>
                  {weather.name}, {weather.sys.country}
                </h1>
                <h2>Sunday 28 March 2021</h2>
              </div>
              <div className="riseSet">
                <h3>{timeBuilder(weather.sys.sunrise * 1000)} for sunrise</h3>
                <h3>{timeBuilder(weather.sys.sunset * 1000)} for sunset</h3>
              </div>
              <div className="weatherInfo">
                <div className="temperature">
                  <h1>
                    {Math.round(weather.main.temp)}
                    <sup>°</sup>c
                  </h1>
                  <h5>
                    Feels Like {Math.round(weather.main.feels_like)}
                    <sup>°</sup>
                  </h5>
                  <h6>
                    Min {Math.round(weather.main.temp_min)}
                    <sup>°</sup>c
                  </h6>
                  <h6>
                    Max {Math.round(weather.main.temp_max)}
                    <sup>°</sup>c
                  </h6>
                </div>
                <div className="description">
                  <h1>{weather.weather[0].main}</h1>
                  <h2>Humidity {weather.main.humidity}%</h2>
                  <h2>Pressure {weather.main.pressure} hPa</h2>
                  <h2>Wind Speed {weather.wind.speed} m/s</h2>
                  <h2>Visiblity {Math.round(weather.visibility / 1000)} km</h2>
                </div>
              </div>
            </div>
          ) : (
            <div className="initial">
              <h2>Get weather for 200k+ cities across the world</h2>
              <div className="instructions">
                <ul>
                  <li>
                    <h3>
                      Simply enter your city name or use format [city, state,
                      country]
                    </h3>
                  </li>
                  <li>
                    <h3>You can also search only for state/country by name</h3>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
