import FoodItem from "../../components/food_item";
import React, { useEffect, useState } from "react";

import SearchBar from "../../components/search-bar";
import "./index.css";
import Food from "../../components/food";
import AddFoodBtn from "../../components/add-food-btn";

export default function Dropoffs() {

  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true); // Add this line


  const fetchData = async () => {
    setLoading(true); // Add this line
    const response = await fetch(`http://localhost:8080/inprogress/creator/${localStorage.getItem("id")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setFood(data);
    setLoading(false); // Add this line


  };
  useEffect(() => {
   
    fetchData();
  }, []);
  const [search, setSearch] = useState("");

  return (
    <div className="w-full flex flex-col">
       
        <div className="text-2xl font-semibold ml-4 mt-6">Dropoffs</div>
      
 {loading ? (
              <div className="w-full flex flex-col items-center mt-3" key={food}>
              Loading...</div> // Render this while the data is loading
      ) : (
      <div className="w-full flex flex-col items-center mt-3" key={food}>
        {
          food
            .filter((item, key) => {
              return !search || item.name.toLowerCase().includes(search.toLowerCase());
            })
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
                 
                />
              );
            })
        }
      </div>
      )}
    </div>
  );
}
