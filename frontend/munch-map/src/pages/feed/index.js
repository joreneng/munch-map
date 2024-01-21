import FoodItem from "../../components/food_item";
import React, { useState } from "react";

import SearchBar from "../../components/search-bar";
import "./index.css";
import Food from "../../components/food";
import AddFoodBtn from "../../components/add-food-btn";

export default function Feed() {
  const [search, setSearch] = useState("");
  const feedData = [
    {
      name: "Griled Cheese",
      description:
        "I like grilled chesses, I like grilled chesses,I like grilled chesses,I like grilled chesses,I like grilled chesses, I like grilled chesses, I like grilled chesses, I like grilled chesses",
      expiry: "4 days",
      location: "3km",
      vegan: false,
      vegetarian: true,
    },
    {
      name: "Chicken Nuggest",
      expiry: "5 days",
      vegan: true,
      vegetarian: true,
    },
    {
      name: "Sample",
      expiry: "4 days",
      vegan: false,
      vegetarian: false,
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <AddFoodBtn />
      <SearchBar search={search} setSearch={setSearch} />
      {!search && (
        <div>
          <div className=" text-2xl font-semibold ml-4">Near You</div>
          <Food
            name={feedData[0].name}
            expiry={feedData[0].expiry}
            location={feedData[0].location}
            description={feedData[0].description}
          />
        </div>
      )}
      {!search && (
        <div className="text-2xl font-semibold ml-4 mt-6">All Munchies</div>
      )}

      <div className="w-full flex flex-col items-center mt-3">
        {feedData
          .filter((item, key) =>
            search
              ? item.name.toLowerCase().includes(search.toLowerCase())
              : key != 0
          )
          .map((item) => (
            <FoodItem
              name={item.name}
              expiry={item.expiry}
              vegan={item.vegan}
              vegetarian={item.vegetarian}
            />
          ))}
      </div>
    </div>
  );
}
