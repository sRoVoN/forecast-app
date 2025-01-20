import React from 'react'
import { RxCrossCircled } from "react-icons/rx";

export default function TopButtons({setQuery, cities}) {
  const handleClick = () => {
    console.log("click");
  }

  return (
    <div className='flex justify-around  items-center my-6 overflow-auto'>
            {
        cities.map((city) => (
          <div
          className='sm:px-3 py-2' 
          key={city.key}
          >
          <RxCrossCircled size={40}
          onClick={handleClick}
           className='cursor-pointer text-red-500 hover:scale-125 p-2 ' />
            <button 
            className='w-20 h-10 md:text-sm md:font-medium text-sm font-thin hover:bg-blue-400 rounded-md transition ease-in '
            onClick={()=> setQuery({ q: city.name})}
             >               
              {city.name}
            </button>
          </div>
        ))
    }
        </div>
  )
}
