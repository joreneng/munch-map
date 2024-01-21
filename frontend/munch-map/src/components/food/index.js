import vegetarianImg from "../../assets/vegetarian.png";
import save from "../../assets/save.svg";

import "./index.css";

export default function Food({
  name,
  image,
  location,
  expiry,
  type,
  diet,
  description,
}) {
  return (
    <div className="food-card relative flex flex-col w-[92%] max-w-[350px] h-[320px] rounded-3xl bg-gray-50 overflow-hidden mx-auto mt-3">
      <div className="absolute top-4 left-4 bg-gray-100 px-3 text-sm py-1 rounded-2xl">
        {location}
      </div>
      <img
        src={vegetarianImg}
        width={350}
        height={150}
        className="overflow-hidden max-h-[150px] bg-red-200"
      />
      <div className="flex flex-row justify-between mx-4 mt-4">
        <div className="px-3 py-1 rounded-2xl days-to-expiry text-sm">
          Expires in: {expiry}
        </div>
        <img src={save} width={20} />
      </div>
      <div className="text-xl italic font-light mx-4 my-2">{name}</div>
      <div className="text-ellipsis whitespace-nowrap mx-4 text-sm overflow-hidden">
        {description}
      </div>
      <button className="px-3 py-1 rounded-2xl days-to-expiry text-sm w-fit mx-4 mt-4">
        Order
      </button>
    </div>
  );
}
