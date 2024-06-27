import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";
function App() {
  const [currentweather, setCurrentweather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchchange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherfetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastfetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

    Promise.all([currentWeatherfetch, forecastfetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentweather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentweather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchchange} />
      {currentweather && <CurrentWeather data={currentweather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
