import React, { useEffect, useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

export default function Input({ setQuery, setUnits, cities, setCities, loading }) {
  const [city, setCity] = useState("");


  const addCity = (cityName) => {
     const newCity=  cities
     .push({
      id: cities.length +1,
      name: cityName,
    });
  }
  useEffect(() => {
    const data = sessionStorage.getItem("cities");
    if (data !== null)  setCities(JSON.parse(data));
  },[])

  const handleSearchClick = () => {
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
    if (city !== "") setQuery({ q: city });
    addCity(capitalizedCity);
    if (city !== "") sessionStorage.setItem("cities", JSON.stringify(cities));
    setCity("");
  };
  const keydownHandler = (e) => {
 if(e.key === "Enter") handleSearchClick()
  }

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-center my-2 sm:my-6">
      <div className="flex flex-row justify-center w-full dm:w-3/4 items-center gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={(e) => keydownHandler(e)}
          placeholder="Search by city"          
          className="text-xl text-gray-500 focus:outline-none placeholder:lowercase capitalize shadow-xl font=light w-full p-2 rounded-md "
        />
        <BiSearch
          size={30}
          className="transition ease-out hover:scale-125 cursor-pointer"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={30}
          className="transition ease-out hover:scale-125 cursor-pointer"
          onClick={handleLocation}
        />
      </div>
          <div className="w-1/4 flex flex-row items-center justify-center mx-auto">
          <button
            className="font-medium text-2xl transition ease-out hover:scale-125"
            onClick={() => setUnits("metric")}
          >
            °C
          </button>
          <p className="tex-2xl font-medium m-2">|</p>
          <button
            className="font-medium text-2xl transition ease-out hover:scale-125"
            onClick={() => setUnits("imperial")}
          >
            °F
          </button>
        </div>
    </div>
  );
}
