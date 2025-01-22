import React, { useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";

export default function TopButtons({setQuery, cities, setCities} ) {
const [city, setCity] = useState({});

// const remainedCities = (city) => {
//  cities.filter((item) => item.id === city.id);
//  console.log(cities, "filtered")
// }
const handleDelet = (city) => {
  
  console.log(city)
} 

  return (
    <div className='flex justify-around  items-center my-6 overflow-auto'>
            {              
           cities.length > 0 ? (cities.map((city) => (
          <div
          className='sm:px-3 py-2' 
          key={city.id}
          >
          <RxCrossCircled size={40}
          values={city}
          onClick={() => handleDelet(city)}
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
