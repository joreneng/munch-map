import "./index.css";
import save from "../../assets/save.svg";
import { dietPictures, foodType } from "../../data";
import { useRef, useEffect } from "react";

export default function FoodItem({
  id,
  name,
  orderText,
  handleSubmit,
  expiry,
  image,
  handleDelete,
  handleComplete,
  location,
  type,
  description,
  diet,
}) {
  const expiryDay = useRef();
  useEffect(() => {
    if (expiry <= 2) {
      expiryDay.current.style.color = "#C8553D";
    } else if (expiry <= 5) {
      expiryDay.current.style.color = "#F28F3B";
    } else {
      expiryDay.current.style.color = "#588B88";
    }
  }, []);

  return (
    <div className="food-item flex flex-row gap-4 p-4 bg-gray-50 rounded-xl mb-2 w-[92%] h-[100px] max-w-[350px]">
      <img
        src={`data:image/jpeg;base64,${image}`}
        width={90}
        height={90}
        className="overflow-hidden"
      />
      <div className="flex flex-col w-full justify-center">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            {diet.map((item) => {
              <img src={dietPictures[item]} alt="" />;
            })}
          </div>
          <div className="w-full flex flex-row justify-end">
            {type.map((item) => {
              <div className="text-sm">{foodType[item]}</div>;
            })}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="italic text-lg font-light">{name}</div>
          <img src={save} width={20} />
        </div>
        <div className="flex flex-row justify-between mt-2 items-center">
          <div className="text-sm">
            Expires in: <span ref={expiryDay}>{expiry} days</span>
          </div>
          {orderText && (
            <button
              className="px-3 py-1 rounded-2xl days-to-expiry text-sm"
              onClick={handleSubmit}
            >
              {orderText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
