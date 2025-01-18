import React from 'react'

export default function TopButtons({setQuery}) {
    const cities = [
        {
            id: 1,
            name: "London",            
        },
        {
            id: 2,
            name: "Tokyo"
        },
        {
            id: 3,
            name: "New York"
        },
        {
            id: 4,
            name: "Paris"
        },
        {
            id: 5,
            name: "Toronto"
        }
    ]
  return (
    <div className='flex justify-around  items-center my-6 overflow-auto'>
            {
        cities.map((city) => (
            <button 
            key={city.id} 
            className='md:text-lg md:font-medium text-sm font-thin hover:bg-blue-400 sm:px-3 py-2 rounded-md transition ease-in'
            onClick={()=> setQuery({ q: city.name})}
             >
                
              {city.name}
            </button>
        ))
    }
        </div>
  )
}
