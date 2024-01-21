import "./index.css";
import save from "../../assets/save.svg";
import { useRef, useEffect } from "react";

export default function OrderFoodItem({
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
  vegan,
  vegetarian,
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
        <div className="flex flex-row justify-between items-center">
          <div className="italic text-lg font-light">{name}</div>
          <button
            className="px-3 py-1 rounded-2xl complete-order text-sm"
            onClick={handleDelete}
          >
            Complete
          </button>
        </div>
        <div className="flex flex-row justify-between mt-4 items-center">
          <div className="text-sm">
            Expires in: <span ref={expiryDay}>{expiry} days</span>
          </div>
          <button
            className="px-3 py-1 rounded-2xl cancel-order text-sm"
            onClick={handleDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
