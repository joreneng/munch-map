import FoodItem from "../../components/food_item";
import React, { useEffect, useState } from "react";

import SearchBar from "../../components/search-bar";
import "./index.css";
import Food from "../../components/food";
import AddFoodBtn from "../../components/add-food-btn";

export default function Pickups() {

  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:8080/inprogress/receiver/${localStorage.getItem("id")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setFood(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completeOrder = async (orderId) => {
    try {
      const response = await fetch(`/order/complete/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error completing order");
      }

      const data = await response.json();
      console.log(data);

      // Fetch data after completing the order
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/order/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting order");
      }

      const data = await response.json();
      console.log(data);

      // Fetch data after deleting the order
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }


  const [search, setSearch] = useState("");

  return (
    <div className="w-full flex flex-col">
      <div className="text-2xl font-semibold ml-4 mt-6">All Pickups</div>
      {loading ? (
        <div className="w-full flex flex-col items-center mt-3">
          Loading...
        </div>
      ) : (
        <div className="w-full flex flex-col items-center mt-3">
          {food
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
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  expiry={diffDays}
                  image={item.image}
                  location={item.address}
                  type={item.type}
                  description={item.description}
                  vegan={item.vegan}
                  vegetarian={item.vegetarian} 
                  order_details = {item.creator_name + " is ready for pickup"}        
                  handleComplete={() => completeOrder(item.id)}
                  handleDelete={() => deleteOrder(item.id)}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}