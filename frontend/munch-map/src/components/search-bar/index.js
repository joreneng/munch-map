import "./index.css";
import filter from "../../assets/filter.svg";
import searchIcon from "../../assets/search.svg";
import React, { useState } from "react";
import Filter from "../filter";

export default function SearchBar({
  search,
  setSearch,
  typeFilters,
  setTypeFilters,
  dietFilters,
  setDietFilters,
  locationFilter,
  setLocationFilter,
  curLocation,
  setCurLocation,
  address,
  setAddress,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full justify-center items-center gap-4 flex flex-row p-4 mt-16">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="w-full py-2 px-4 border bg-gray-50 focus:bg-white rounded-2xl focus:outline-none"
      />
      <button className="w-6 h-6" onClick={handleSubmit}>
        <img
          src={searchIcon}
          width={20}
          height={20}
          className="overflow-hidden"
        />
      </button>
      <div
        className="flex justify-center items-center w-6 h-6 bg-gray-50 rounded-[50%]"
        onClick={() => setShowFilters(true)}
      >
        <img src={filter} width={20} height={20} />
      </div>
      {showFilters && (
        <Filter
          address={address}
          setAddress={setAddress}
          showFilters={setShowFilters}
          typeFilters={typeFilters}
          setTypeFilters={setTypeFilters}
          dietFilters={dietFilters}
          setDietFilters={setDietFilters}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          curLocation={curLocation}
          setCurLocation={setCurLocation}
        />
      )}
    </div>
  );
}
