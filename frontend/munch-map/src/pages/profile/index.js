import { useState } from "react";
import "./index.css";
import profilePic from "../../assets/pictures/profile-pic.png";
import pending from "../../assets/pending.svg";
import checkmark from "../../assets/checkmark.svg";
import expired from "../../assets/expired.svg";

export default function Profile() {
    return (
        <div className="profile">
            <div className="header">
                <img src={profilePic} alt="Profile" className="profile-pic"/>
                <h1 className="profile-name">Martin Li</h1>
            </div>

            <div className="order-section">
                <div className={"title"}><b>Orders</b></div>
                <div className="order-card ongoing">
                    <div className={"title"}><img src={pending}/> Ongoing</div>
                    <p>Pizza, Burger ...</p>
                </div>
                <div className="order-card completed">
                    <div className={"title"}><img src={checkmark}/> Completed</div>
                    <p>Bacon, Panini, Pancakes, Cake...</p>
                </div>
                <div className="order-card expired">
                    <div className={"title"}><img src={expired}/> Expired</div>
                    <p>Bacon, Panini, Pancakes, Cake...</p>
                </div>
            </div>

            {/*<nav className="navigation-bar">*/}
            {/*    <a href="#" className="nav-item">Home</a>*/}
            {/*    <a href="#" className="nav-item">My Foods</a>*/}
            {/*    <a href="#" className="nav-item">Profile</a>*/}
            {/*</nav>*/}

        </div>
    );
}