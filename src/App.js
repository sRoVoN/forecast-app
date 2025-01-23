import React, { useState, useEffect } from "react";
import getFormattedWeatherData from "./WeatherService";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import TopButtons from "./components/TopButtons";
import Input from "./components/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScaleLoader } from 'react-spinners'
import Spinner from "./components/Spinner";
const initialCities = [
  {
    id: 1,
    name: "London",
  },
  {
    id: 2,
    name: "Tokyo",
  },
  {
    id: 3,
    name: "New York",
  },
  {
    id: 4,
    name: "Paris",
  },
  {
    id: 5,
    name: "Toronto",
  },
];
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ q: "London" });
  const [units, setUnits] = useState("metric");
  const [cities, setCities] = useState(
    initialCities,
    sessionStorage.getItem("searchedCity")
  );

  const getWeather = async () => {
    try {
      const message = query.q ? query.q : "current location";
      setLoading(true);
      const data = await getFormattedWeatherData({ ...query, units });

      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
    console.log(loading)
  }, [query, units]); // Empty dependency array to run only once when the component mounts

  const formatBackground = () => {
    if (!weatherData) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weatherData.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ): (
        <>
          <div
            className={`mx-auto max-w-screen-lg mt-4 py-3 px-3 overflow-hidden sm:px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
          >
            <TopButtons
              setQuery={setQuery}
              cities={cities}
              setCities={setCities}
            />
            <Input
              setQuery={setQuery}
              setUnits={setUnits}
              cities={cities}
              setCities={setCities}
              loading={loading}
            />
            {weatherData && (
              <div>
                <TimeAndLocation weatherData={weatherData} />
                <TempAndDetails weatherData={weatherData} units={units} />
                <Forecast
                  title="3 hours step forecast"
                  data={weatherData.hourly}
                />
                <Forecast title="daily forecast" data={weatherData.daily} />
              </div>
            )}
            <ToastContainer
              autoClose={3000}
              hideProgressBar={true}
              theme="colored"
            />
            )
          </div>
        </>
      )}
    </>
  );
}

export default App;
