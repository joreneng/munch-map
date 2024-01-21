import FoodItem from "../../components/food_item";
import React, { useEffect, useState } from "react";

import SearchBar from "../../components/search-bar";
import "./index.css";
import Food from "../../components/food";
import homeLogo from "../../assets/home-logo.svg";
import profileLogo from "../../assets/profile-logo.svg";
import AddFoodBtn from "../../components/add-food-btn";
import { foodType, dietOptions } from "../../data";

export default function Feed() {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true); // Add this line

  const fetchData = async () => {
    setLoading(true); // Add this line
    const response = await fetch("http://localhost:8080/available", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setFood(data);
    setLoading(false); // Add this line

    const location = await fetch(
      "https://geocode.maps.co/search?q=Marine+Drive+Residence-6,Vancouver,+BC&api_key=65ac97fadc6e9563144116mcp5edab4"
    );

    const locationData = await location.json();

    console.log(locationData[0].lat);
    console.log(locationData[0].lon);
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

  const [typeFilters, setTypeFilters] = useState([]);
  const [dietFilters, setDietFilters] = useState([]);
  const [locationFilter, setLocationFilter] = useState(0);
  const [curLocation, setCurLocation] = useState();

  const filtering = (food) => {
    if (search && !food.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    if (typeFilters && !typeFilters.includes(foodType[food.type])) {
      return false;
    }

    if (dietFilters && !dietFilters.includes(dietOptions[food.diet])) {
      return false;
    }

    // Todo: add geo thingy for the filtering

    return true;
  };

  return (
    <div className="w-full flex flex-col">
      <nav className="navigation-bar">
        <a href="/feed" className="nav-item"><img src={homeLogo} alt={"Home"}/></a>
        <a href="/profile" className="nav-item"><img src={profileLogo} alt={"Profile"}/></a>
      </nav>

      <AddFoodBtn />
      <SearchBar
        search={search}
        setSearch={setSearch}
        typeFilters={typeFilters}
        setTypeFilters={setTypeFilters}
        dietFilters={dietFilters}
        setDietFilters={setDietFilters}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        curLocation={curLocation}
        setCurLocation={setCurLocation}
      />
      {!search &&
        typeFilters.length === 0 &&
        dietFilters.length === 0 &&
        !locationFilter && (
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
      {!search &&
        typeFilters.length === 0 &&
        dietFilters.length === 0 &&
        !locationFilter && (
          <div className="text-2xl font-semibold ml-4 mt-6">All Munchies</div>
        )}
      {loading ? (
        <div className="w-full flex flex-col items-center mt-3" key={food}>
          Loading...
        </div> // Render this while the data is loading
      ) : (
        <div className="w-full flex flex-col items-center mt-3" key={food}>
          {food
            .filter((item, key) => filtering(item))
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
                  handleSubmit={async () => {
                    const response = await fetch(
                      `http://localhost:8080/order/${
                        item.id
                      }/${localStorage.getItem("id")}`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    const data = await response.json();
                    console.log(data);
                    window.location.href = "/pickups";
                  }}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
