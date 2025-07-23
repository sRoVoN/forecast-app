import { FaRegCircle, FaTrash } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

export default function TopButtons({
  setQuery,
  cities,
  activeCity,
  setActiveCity,
  setCities,
  background
}) {

  const isWarm = background.includes("yellow");

  const handleClick = (city) => {
    setQuery({ q: city.name });
    setActiveCity(city.name);
  };
  const handleButton = (city) => {
    setQuery({ q: city });
    setActiveCity(city);
    console.log(city)
  };
  const handleDelete = () => {
    const updated = cities.slice(0, 5); // حذف شهر ششم
    setCities(updated);
    sessionStorage.removeItem("customCity");

    if (activeCity === cities[5].name) {
      setActiveCity("London");
      setQuery({ q: "London" });
    }
  };

  return (
    <div className="flex justify-center py-4 gap-2  overflow-x-auto no-scrollbar">
      {cities.map((city, index) => (
        <div
          key={city.id}
          className={`
            hidden md:flex items-center rounded-xl px-3 py-2 transition-all duration-300 border-b-4
            ${activeCity === city.name
              ? isWarm
                ? "border-orange-400 text-orange-200 bg-orange-500"
                : "border-cyan-400 text-cyan-200 bg-cyan-600"
              : isWarm
                ? "border-transparent text-white bg-orange-400 hover:bg-orange-500"
                : "border-transparent text-white bg-cyan-500 hover:bg-cyan-600"
            }
          `}
        >
          <button
            onClick={() => handleClick(city)}
            className="text-sm truncate w-max-16 p-2"
          >
            {city.name}
          </button>
          {index >= 5 && (
            <button
              onClick={handleDelete}
              className="ml-2 text-red-100 hover:text-red-500"
            >
              <FaTrash size={12} />
            </button>
          )}
        </div>
      ))}
      {cities.map((city) => (
        <button
          className="flex md:hidden justify-center items-center mx-auto overflow-scroll bg-transparent "
          key={city.id}
          onClick={() => handleButton(city.name)}
        >
          {activeCity === city.name ? (
            <FaCircle color="#f7d620" />
          ) : (
            <FaRegCircle />
          )}
        </button>
      ))}
    </div>
  );
}
