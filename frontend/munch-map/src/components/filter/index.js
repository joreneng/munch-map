import "./index.css";
import exitIcon from "../../assets/exit.svg";
import { dietOptions, foodType } from "../../data";
import FilterBtn from "../filter-btn";
import { locationOptions } from "../../data";
import FilterLocationBtn from "../filter-location-btn";

import React, { useState } from "react";

export default function Filter({
  showFilters,
  typeFilters,
  setTypeFilters,
  dietFilters,
  setDietFilters,
  locationFilter,
  setLocationFilter,
}) {
  const handleTypeSelect = (name, active) => {
    if (active) {
      setTypeFilters(typeFilters.filter((item) => item !== name));
    } else {
      setTypeFilters((prev) => [...prev, name]);
    }
  };

  const handleDietSelect = (name, active) => {
    if (active) {
      setDietFilters((prev) =>
        prev.splice(prev.indexOf(name), prev.indexOf(name) + 1)
      );
    } else {
      setDietFilters((prev) => [...prev, name]);
    }
  };

  const [curLocation, setCurLocation] = useState("");

  const handleLocationSelect = (name) => {
    setLocationFilter(name);
    setCurLocation(name);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="flex flex-row justify-between w-full">
          <div className="italic text-xl font-light">Select Filters</div>
          <img src={exitIcon} onClick={() => showFilters(false)} />
        </div>

        <div className="text-lg font-medium w-full text-left">Type</div>
        <div className="filter-container flex flex-row gap-2 flex-wrap">
          {foodType.map((type) => (
            <FilterBtn name={type} handleSelect={handleTypeSelect} />
          ))}
        </div>

        <div className="text-lg font-medium w-full text-left">Type</div>
        <div className="filter-container flex flex-row gap-2 flex-wrap">
          {dietOptions.map((type) => (
            <FilterBtn name={type} handleSelect={handleDietSelect} />
          ))}
        </div>

        <div className="text-lg font-medium w-full text-left">Distance</div>
        <div className="filter-container flex flex-row gap-2 flex-wrap w-full justify-start">
          {locationOptions.map((option) => (
            <FilterLocationBtn
              name={option}
              handleSelect={handleLocationSelect}
              curActive={curLocation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
