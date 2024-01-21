import "./index.css";
import info from "../../assets/info.svg";
import savedMeals from "../../assets/meals-saved.svg";
import savedFood from "../../assets/saved_food.svg";
import savedMoney from "../../assets/money-saved.svg";
import savedWater from "../../assets/water-saved.svg";
import savedCarbon from "../../assets/carbon-saved.svg";

export default function Dashboard() {
    return (
        <div className={"dashboard"}>
            <div className={"container"}>
                <div className="info"><img src={info}/></div>
                <div className="saved"><img src={savedFood}/></div>
                <div className="saved"><img src={savedMeals}/></div>
                <div className="saved"><img src={savedMoney}/></div>
                <div className="saved"><img src={savedWater}/></div>
                <div className="saved"><img src={savedCarbon}/></div>
            </div>
        </div>
    );
}