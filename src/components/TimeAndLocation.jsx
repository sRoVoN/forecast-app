import React from "react";

export default function TimeAndLocation({
  weatherData,
  formattedLocalTime,
}) {
    const { name, country } = weatherData;   
  return (
    <div className="flex items-center justify-center my-6">
        <p className="text-xl font-extralight">{formattedLocalTime}</p>
      <div className="flex items-center justify-center my-6">
      <p className="text-xl font-extralight">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}
