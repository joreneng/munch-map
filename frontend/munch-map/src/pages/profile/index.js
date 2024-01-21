import { useEffect, useState } from "react";
import "./index.css";
import profilePic from "../../assets/pictures/profile-pic.png";
import pending from "../../assets/pending.svg";
import checkmark from "../../assets/checkmark.svg";
import expired from "../../assets/expired.svg";
import FoodItem from "../../components/food_item";
import homeLogo from "../../assets/home-logo.svg";
import profileLogo from "../../assets/profile-logo.svg";
import AddFoodBtn from "../../components/add-food-btn";

export default function Profile() {
  const [food, setFood] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [expiredArr, setExpired] = useState([]);
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8080/categories/creator/${localStorage.getItem("id")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setFood(data);
    setOngoing(data.ongoing);
    setCompleted(data.completed);
    setExpired(data.expired);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="profile">
      <nav className="navigation-bar">
        <a href="/feed" className="nav-item">
          <img src={homeLogo} alt={"Home"} />
        </a>
        <a href="/profile" className="nav-item">
          <img src={profileLogo} alt={"Profile"} />
        </a>
        <AddFoodBtn />
      </nav>

      <div className="header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h1 className="profile-name">Martin Li</h1>
      </div>

      <div className="order-section">
        <div className={"title mb-4"}>
          <b>Orders</b>
        </div>
        <div className="order-card ongoing">
          <div className={"title"}>
            <img src={pending} /> Ongoing
          </div>
        </div>
        {ongoing.map((item) => {
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
              // location={item.address}
              type={item.type}
              diet={item.diet}
              description={item.description}
              vegan={item.vegan}
              vegetarian={item.vegetarian}
              orderText={"Delete"}
              handleSubmit={async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:8080/food/${item.id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                fetchData();
              }}
            />
          );
        })}
        <div className="order-card completed">
          <div className={"title"}>
            <img src={checkmark} /> Completed
          </div>
        </div>
        {completed.map((item) => {
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
              // location={item.address}
              type={item.type}
              diet={item.diet}
              description={item.description}
              vegan={item.vegan}
              vegetarian={item.vegetarian}
            />
          );
        })}
        <div className="order-card expired">
          <div className={"title"}>
            <img src={expired} /> Expired
          </div>
        </div>
        {expiredArr.map((item) => {
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
              // location={item.address}
              type={item.type}
              description={item.description}
              vegan={item.vegan}
              diet={item.diet}
              vegetarian={item.vegetarian}
              orderText={"Delete"}
              handleSubmit={async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:8080/food/${item.id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                fetchData();
              }}
            />
          );
        })}
      </div>
    </div>
  );
}