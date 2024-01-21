import "./index.css";
import info from "../../assets/info.svg";
import savedMeals from "../../assets/meals-saved.svg";
import savedFood from "../../assets/saved_food.svg";
import savedMoney from "../../assets/money-saved.svg";
import savedWater from "../../assets/water-saved.svg";
import savedCarbon from "../../assets/carbon-saved.svg";

import AddFoodBtn from "../../components/add-food-btn";
import homeLogo from "../../assets/home-logo.svg";
import profileLogo from "../../assets/profile-logo.svg";

export default function Dashboard() {
  return (
    <div className="bg-[#C8553D]">
      <nav className="navigation-bar">
        <a href="/feed" className="nav-item">
          <img src={homeLogo} alt={"Home"} />
        </a>
        <a href="/profile" className="nav-item">
          <img src={profileLogo} alt={"Profile"} />
        </a>
        <AddFoodBtn />
      </nav>
      <div className={"dashboard mt-4"}>
        <div className={"container"}>
          <div className="info">
            <img src={info} />
          </div>
          <div className="saved">
            <img src={savedFood} />
          </div>
          <div className="saved">
            <img src={savedMeals} />
          </div>
          <div className="saved">
            <img src={savedMoney} />
          </div>
          <div className="saved">
            <img src={savedWater} />
          </div>
          <div className="saved">
            <img src={savedCarbon} />
          </div>
        </div>
      </div>
    </div>
  );
}