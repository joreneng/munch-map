import "./index.css";
import filter from "../../assets/filter.svg";
import searchIcon from "../../assets/search.svg";
import React, { useState } from "react";

export default function SearchBar({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    console.log("search");
  };
  return (
    <div className="w-full justify-center items-center gap-4 flex flex-row p-4">
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
      <div className="flex justify-center items-center w-6 h-6 bg-gray-50 rounded-[50%]">
        <img src={filter} width={20} height={20} />
      </div>
    </div>
  );
}
