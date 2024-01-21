import FoodItem from "../../components/food_item";
import React, { useEffect, useState } from "react";

import SearchBar from "../../components/search-bar";
import "./index.css";
import Food from "../../components/food";
import AddFoodBtn from "../../components/add-food-btn";

export default function Feed() {

  const [food, setFood] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/available", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setFood(data);

  };
  useEffect(() => {
   
    fetchData();
  }, []);
  const [search, setSearch] = useState("");
  const feedData = [
    {
      name: "Griled Cheese",
      description:
        "I like grilled chesses, I like grilled chesses,I like grilled chesses,I like grilled chesses,I like grilled chesses, I like grilled chesses, I like grilled chesses, I like grilled chesses",
      expiry: 4,
      location: "3km",
      vegan: false,
      vegetarian: true,
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
        {
          food
            .filter((item, key) =>
              search
                ? item.name.toLowerCase().includes(search.toLowerCase())
                : key != 0
            )
            .map((item) => {
              const expiryDate = new Date(item.expiry);
              const currentDate = new Date();
              const diffTime = Math.abs(expiryDate - currentDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              return (
                <FoodItem
                  id={item.id}
                  name={item.name}
                  expiry={diffDays}
                  image={item.image}
                  location={item.address}
                  type={item.type}
                  description={item.description}
                  vegan={item.vegan}
                  vegetarian={item.vegetarian}
                  orderText={"Order"}
                />
              );
            })
        }
      </div>
    </div>
  );
}
