import React, { useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

export default function Input({ setQuery, setUnits }) {    
    const [city, setCity] = useState("");


    const  handleSearchClick = () => {
        if (city !== "") setQuery({q: city});
        setCity("")
    };
    const handleLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
              const {latitude, longitude} = position.coords;
              setQuery({lat: latitude, lon: longitude})
            })
        }
    }
  return (
    <div className="flex flex-row justify-center my-2 sm:my-6">
      <div className="flex flex-row justify-center w-3/4 items-center gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          placeholder="Search by city"
          className="text-xl text-gray-500 focus:outline-none placeholder:lowercase capitalize shadow-xl font=light w-full p-2 "
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
      <div className="w-1/4 flex flex-col sm:flex-row items-center justify-center ">
        <button className="font-medium text-2xl transition ease-out hover:scale-125"
        onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="tex-2xl font-medium m-2">|</p>
        <button className="font-medium text-2xl transition ease-out hover:scale-125"
        onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
