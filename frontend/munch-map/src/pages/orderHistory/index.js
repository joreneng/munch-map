import { useEffect, useState } from "react";
import "./index.css";
import profilePic from "../../assets/pictures/profile-pic.png";
import pending from "../../assets/pending.svg";
import checkmark from "../../assets/checkmark.svg";
import expired from "../../assets/expired.svg";
import FoodItem from "../../components/food_item";

export default function OrderHistory() {
    const [food, setFood] = useState([]);

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/orders/history/3", {
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
    return (
        <div className="profile">
            <div className="header">
                <img src={profilePic} alt="Profile" className="profile-pic"/>
                <h1 className="profile-name">Martin Li</h1>
            </div>

            <div className="order-section">
                <div className={"title"}><b>Order History</b></div>
                {
                        food.map((item) => {
                            const expiryDate = new Date(item.expiry);
                            const currentDate = new Date();
                            const diffTime = Math.abs(expiryDate - currentDate);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            return (
                                <FoodItem
                                    id = {item.id}
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

            {/*<nav className="navigation-bar">*/}
            {/*    <a href="#" className="nav-item">Home</a>*/}
            {/*    <a href="#" className="nav-item">My Foods</a>*/}
            {/*    <a href="#" className="nav-item">Profile</a>*/}
            {/*</nav>*/}

        </div>
    );
}