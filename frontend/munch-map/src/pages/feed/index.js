import FoodItem from "../../components/food_item";
import React, { useEffect, useState } from "react";
import  haversine from 'haversine';


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
  const [address, setAddress] = useState("")

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await fetch(
          `https://geocode.maps.co/search?q=${address}&api_key=65ac97fadc6e9563144116mcp5edab4`
        );

        const locationData = await location.json();
        setLat(locationData[0].lat);
        setLon(locationData[0].lon);
      } catch (error) {
        console.error('Failed to parse address:', error);
      }
    };

    fetchLocation();
  }, [address]);

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

    const location1 = await fetch(
      "https://geocode.maps.co/search?q=Marine+Drive+Residence-6,Vancouver,+BC&api_key=65ac97fadc6e9563144116mcp5edab4"
    );
    const locationA = await location1.json();


const location2 = await fetch(
      "https://geocode.maps.co/search?q=Ponderosa+Commons+Studios,Vancouver,+BC&api_key=65ac97fadc6e9563144116mcp5edab4"
    );

    const locationB = await location2.json();

    console.log(locationA[0].lat, " ", locationA[0].lon);
    console.log(locationB[0].lat, " ", locationB[0].lon);

    const point1 = { latitude: 37.7749, longitude: -122.4194 }; // San Francisco, CA
    const point2 = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles, CA

    // Calculate the distance between the two points
    const result = haversine(point1, point2);
    console.log("Distance Between ", result);



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

    if (
      typeFilters.length !== 0 &&
      !typeFilters.includes(foodType[food.type])
    ) {
      console.log(typeFilters.length);
      return false;
    }

    if (
      dietFilters.length !== 0 &&
      !dietFilters.includes(dietOptions[food.diet])
    ) {
      console.log(dietFilters.length);
      return false;
    }

    // Todo: add geo thingy for the filtering

    return true;
  };

  return (
    <div className="w-full flex flex-col">
      <nav className="navigation-bar">
        <a href="/feed" className="nav-item">
          <img src={homeLogo} alt={"Home"} />
        </a>
        <a href="/profile" className="nav-item">
          <img src={profileLogo} alt={"Profile"} />
        </a>
        <AddFoodBtn />
      </nav>

      <SearchBar
        address={address}
        setAddress={setAddress}
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
        <div className="w-full flex flex-col items-center mt-3" key={address + food}>
          {food.filter(filtering).map((item) => {
            const expiryDate = new Date(item.expiry);
            const currentDate = new Date();
            const diffTime = Math.abs(expiryDate - currentDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let result = 0;

            try {
              const addr = JSON.parse(item.address);
             const lat1 = addr.Lat;
             const lon1 = addr.Lon;

              const point1 = { latitude: lat1, longitude: lon1 };
              const point2 = { latitude: lat, longitude: lon };
              console.log("Point 1 ", point1);
              console.log("Point 2 ", point2);
          
              // Calculate the distance between the two points
              result = haversine(point1, point2);
              result = parseFloat(result.toFixed(1));




            } catch (error) {
              // console.log("Error is ", error)
            }

            

            return (
              <FoodItem
                id={item.id}
                name={item.name}
                expiry={diffDays}
                image={item.image}
                location={result}
                type={item.type}
                description={item.description}
                diet={item.diet}
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
