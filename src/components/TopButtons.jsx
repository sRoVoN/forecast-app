import React, { useEffect } from 'react'
import { RxCrossCircled } from "react-icons/rx";

export default function TopButtons({setQuery, cities, setCities} ) {

const removeCitySessionStorage = (city) => {
   sessionStorage.removeItem(`${city.name}`);
}

const handleDelet = (city) => {
  removeCitySessionStorage(city);
  const updatedCity = cities.filter((item) => item.id !== city.id);
  setCities(updatedCity);
  if (city !== "") sessionStorage.setItem(`${city.name}`, JSON.stringify(city));
  if (city !== "") sessionStorage.setItem("cities", JSON.stringify(updatedCity));
} 

  return (
    <div className='flex justify-around  items-center my-6 overflow-auto'>
            {              
           cities ? (cities.map((city) => (
          <div
          className='sm:px-3 py-2' 
          key={city.id}
          >
          <RxCrossCircled size={40}
          values={city}
          onClick={() => handleDelet(city)}
          onTouchStart={() => handleDelet(city)}
           className='cursor-pointer text-red-500 hover:scale-125 p-2 ' />
            <button 
            className='w-20 h-10 md:text-sm md:font-medium text-sm font-thin hover:bg-blue-400 rounded-md transition ease-in '
            onClick={()=> setQuery({ q: city.name})}
             >               
              {city.name}
            </button>
          </div>
        ))) : null
    }
        </div>
  )
}
