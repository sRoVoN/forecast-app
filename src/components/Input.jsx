import {  useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

export default function Input({
  setQuery,
  setUnits,
  cities,
  setCities,
  setActiveCity,
}) {
  const [city, setCity] = useState("");

const handleSearchClick = () => {
  const formatted = city.trim();
  if (!formatted) return;

  const capitalizedCity =
    formatted.charAt(0).toUpperCase() + formatted.slice(1);

  const isDuplicate = cities.some(
    (c) => c.name.toLowerCase() === capitalizedCity.toLowerCase()
  );
  const isCustomExists = cities.length > 5;

  if (isDuplicate) {
    alert("This city is already added as one of your favorite cities!");
    setQuery({ q: capitalizedCity }); // still allow search
    setActiveCity(capitalizedCity);
    setCity("");
    return;
  }

  if (isCustomExists) {
    setQuery({ q: capitalizedCity });
    setActiveCity("");
    setCity("");
    return;
  }

  // Ask for confirmation before adding as favorite
  const confirmAdd = window.confirm(
    `Do you want to add "${capitalizedCity}" to your favorite cities?`
  );

  if (confirmAdd) {
    const newCity = { id: Date.now(), name: capitalizedCity };
    setCities((prev) => [...prev, newCity]);
    sessionStorage.setItem("customCity", JSON.stringify(newCity));
  }

  setQuery({ q: capitalizedCity });
  setActiveCity(capitalizedCity);
  setCity("");
};


  const keydownHandler = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

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
      <div className="flex flex-row justify-center w-full sm:w-3/4 items-center gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={keydownHandler}
          placeholder="Search by city"
          className="text-xl text-gray-500 focus:outline-none placeholder:lowercase capitalize shadow-xl font-light w-full p-2 rounded-md"
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

      <div className="w-1/4 flex flex-row items-center justify-center mx-auto mt-4 sm:mt-0">
        <button
          className="font-medium text-2xl transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="text-2xl font-medium m-2">|</p>
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
