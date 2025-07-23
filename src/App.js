import { useState, useEffect, useCallback } from "react";
import getFormattedWeatherData from "./WeatherService";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import TopButtons from "./components/TopButtons";
import Input from "./components/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [cities, setCities] = useState(initialCities);
  const [activeCity, setActiveCity] = useState("London");
  const [background, setBackground] = useState("from-cyan-600 to-blue-700");

  useEffect(() => {
    const stored = sessionStorage.getItem("customCity");
    if (stored) {
      const customCity = JSON.parse(stored);
      setCities([...initialCities, customCity]);
    }
  }, []);

  const getWeather = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFormattedWeatherData({ ...query, units });
      setWeatherData(data);

      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) {
        setBackground("from-cyan-600 to-blue-700");
      } else {
        setBackground("from-yellow-600 to-orange-700");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      const message = query.q ? query.q : "current location";
      toast.error(`Failed to fetch weather for ${message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  }, [query, units]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return (
    <>
      <div
        className={`mx-auto max-w-screen-lg mt-4 py-3 px-3 overflow-hidden sm:px-32 bg-gradient-to-br shadow-xl shadow-gray-400 transition-colors duration-500 ${background}`}
      >
        <TopButtons
          setQuery={setQuery}
          cities={cities}
          activeCity={activeCity}
          setCities={setCities}
          setActiveCity={setActiveCity}
          background={background}
        />
        <Input
          setQuery={setQuery}
          setUnits={setUnits}
          cities={cities}
          setCities={setCities}
          loading={loading}
          setActiveCity={setActiveCity}
        />
        {weatherData && (
          <div>
            <TimeAndLocation weatherData={weatherData} />
            <TempAndDetails weatherData={weatherData} units={units} />
            <Forecast title="3 hours step forecast" data={weatherData.hourly} />
            <Forecast title="daily forecast" data={weatherData.daily} />
          </div>
        )}
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          theme="colored"
        />
      </div>
    </>
  );
}

export default App;
