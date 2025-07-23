import { DateTime } from "luxon";
const API_KEY = "ad1638d70d18524d5c67056b3e47f843";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((res) => res.json().then((data) => data));
};
const iconUrlFromCode = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;
const formatToLocalTime = (
  secs,
  offset,
  format = " cccc, dd lll yyyy' | Local time:' hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatcurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;
  const icon = weather && weather[0] ? weather[0].icon : null;
  const description = weather && weather[0] ? weather[0].description : null;

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    country,
    dt,
    description,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh mm a"),
    speed,
    icon: icon ? iconUrlFromCode(icon) : null,
    timezone,
    formatToLocalTime,
  };
};
const formatForcasteWeather = (secs, offset, date) => {
  const hourly = date
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh: mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);
  const daily = date
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));
  return { hourly, daily };
};
const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatcurrent);
    const { lon, lat, dt, timezone } = formattedCurrentWeather;

    // Fetch the forecast data and format it
    const forecastData = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    });

    const formattedForecastWeather = formatForcasteWeather(
      dt,
      timezone,
      forecastData.list
    );

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Optionally rethrow to handle errors at a higher level
  }
};

export default getFormattedWeatherData;
