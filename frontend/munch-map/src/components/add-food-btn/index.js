import "./index.css";
import addIcon from "../../assets/add.svg";
import { useState } from "react";
import AddFoodPage from "../add-food-page";

export default function AddFoodBtn() {
  const [add, setAdd] = useState(false);

  return (
    <div>
      <button
        className="add-food-btn rounded-[50%] w-10 h-10 flex justify-center items-center"
        onClick={() => setAdd(true)}
      >
        <img src={addIcon} width={20} height={20} />
      </button>
      {add && <AddFoodPage exitPopup={setAdd} />}
    </div>
  );
}
