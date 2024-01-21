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
  order_details,
  handleDelete,
  handleComplete,
  location,
  type,
  description,
  diet,
}) {
  const expiryDay = useRef();
  useEffect(() => {
    diet.map((item) => console.log(item));
    if (expiry <= 2) {
      expiryDay.current.style.color = "#C8553D";
    } else if (expiry <= 5) {
      expiryDay.current.style.color = "#F28F3B";
    } else {
      expiryDay.current.style.color = "#588B88";
    }
  }, []);

  return (
    <div className="food-item flex flex-row gap-4 p-4 bg-gray-50 rounded-xl mb-2 w-[92%] h-[125px] max-w-[350px]">
      <img
        src={`data:image/jpeg;base64,${image}`}
        width={100}
        height={100}
        className="overflow-hidden"
      />
      <div className="flex flex-col w-full justify-center mt-1">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2">
            {diet.map((item) => (
              <img
                src={dietPictures[item]}
                alt=""
                className="overflow-hidden w-3 h-3"
              />
            ))}
          </div>
          <div className="w-full flex flex-row justify-end gap-2 items-center">
            {type.map((item) => (
              <div className="text-[10px] bg-green-100 px-2 rounded-md py-[3px]">
                {foodType[item]}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between mt-1">
          <div className="italic text-lg font-light">{name}</div>
          <img src={save} width={15} />
        </div>
        <div className="flex flex-row justify-between mt-1 items-center">
          <div className="text-xs">
            Expires in: <span ref={expiryDay}>{expiry} days</span>
          </div>
          {orderText && (
            <button
              className="px-3 py-1 rounded-2xl days-to-expiry text-xs"
              onClick={handleSubmit}
            >
              {orderText}
            </button>
          )}
        </div>
        <div className="flex mt-[2px]  text-xs">
          {location > 0 && (
            <div className="px-2 py-[2px] bg-gray-300 rounded-xl">
              {location} km
            </div>
          )}
          {order_details && <div>{order_details}</div>}
        </div>
      </div>
    </div>
  );
}
