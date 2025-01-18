
import React, { useState, useEffect } from 'react';
import getFormattedWeatherData from './WeatherService';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import TopButtons from './components/TopButtons';
import Input from './components/Input';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({q: "London"});
  const [units, setUnits] = useState("metric");
 
  const getWeather = async () => {
    try {
      const  message = query.q ? query.q : "current location";
      toast.info(`Fetching weather data for ${message}`);
      setLoading(true);
      const data = await getFormattedWeatherData({ ...query, units });

      setWeatherData(data);
      toast.success(`Fetchind data for ${data.name}, ${data.country}`)
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Failed to fetch weather data. Please try again.");
    }finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);  // Empty dependency array to run only once when the component mounts
 
  const formatBackground = () => {
    if(!weatherData) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weatherData.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  }
  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-3 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`} >
      <TopButtons setQuery={setQuery} />
      <Input setQuery={setQuery} setUnits={setUnits} />
      {weatherData  && (
        <div>
          <TimeAndLocation weatherData={weatherData} />
          <TempAndDetails weatherData={weatherData} units={units} />
          <Forecast title="3 hours step forecast" data={weatherData.hourly} />
          <Forecast title="daily forecast" data={weatherData.daily} />
        </div>
      )}
      <ToastContainer autoClose={3000} hideProgressBar={true} theme='colored' />
    </div>
  );
}

export default App;
