import React from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
export default function TempAndDetails({ weatherData, units }) {
  const {
    icon,
    temp,
    temp_min,
    temp_max,
    speed,
    sunrise,
    sunset,
    humidity,
    feels_like,
    description
  } = weatherData;
  console.log(units);
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s" }`,
    },
  ];
  const horizantalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: `${sunrise}`,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: `${sunset}`,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}`
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()} km/h`,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-center text-xl text-cyan-300 sm:py-6">
        {description}
      </div>
      <div className="flex flex-row sm:py-3 items-center justify-between ">
        <img src={icon} alt="weather icon" className="hidden sm:flex w-20" />
        <p className="text-5xl">{`${temp.toFixed()}`}</p>
        <div className="flex flex-col items-start space-y-3 overflow-hidden">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm justify-center items-center"
            >
              <Icon size={18} className="mr-1" />
              {`${title}`}
              <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 sm:space-x-10 py-3 text-sm overflow-auto">
        {horizantalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={18} className="hidden sm:flex sm:mr-1 m-0" />
            <p className="font-light text-sm ml-1">
            {`${title}`}
            </p>
            <span className="md:font-medium font-thin sm:ml-1 m-0">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
