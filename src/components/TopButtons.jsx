import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

export default function TopButtons({ setQuery, cities, setCities }) {
  const [activeButton, setActiveButton] = useState(null);

  const removeCitySessionStorage = (city) => {
    sessionStorage.removeItem(`${city.name}`);
  };
  const handleClick = (city) => {
    setQuery({ q: city.name });
    setActiveButton(city.id);
    console.log(city);
  };
  const handleButton = (city) => {
    setQuery({ q: city });
    setActiveButton(city);
    console.log(city)
  };

  return (
    <div className="flex justify-center py-5 items-center overflow-x-auto w-full mx-auto px-2 ">
      {cities.map((city) => (
        <div
          className={`hidden sm:flex sm:px-1 py-0  bg-sky-500 mr-2  rounded-xl 
                        ${activeButton === city.id ? "scale-y-45" : ""}
            ${activeButton === city.id ? "rounded-b-md" : ""}
            ${activeButton === city.id ? "text-yellow-500" : "text-white"}
             ${
               activeButton === city.id
                 ? "border-b-8 border-b-yellow-500"
                 : "text-white"
             }
          `}
          key={city.id}
        >
          <button
            className={`flex justify-center items-center w-24 h-10 text-sm font-medium  truncate hover:scale-75 transition-all
            ${activeButton === city.id ? "scale-y-125" : ""}
            ${activeButton === city.id ? "rounded-b-md" : ""}
            ${activeButton === city.id ? "text-yellow-500" : "text-white"}
              `}
            onClick={() => handleClick(city)}
          >
            {city.name}
          </button>
        </div>
      ))}
      {cities.map((city) => (
        <button
          className="flex md:hidden justify-center items-center mx-auto overflow-scroll bg-transparent "
          key={city.id}
          onClick={() => handleButton(city.name)}
        >
          {activeButton == city.name ? <FaCircle color="#f7d620" /> : <FaRegCircle  />}
        </button>
      ))}
    </div>
  );
}
