import "./index.css";
import veganImg from "../../assets/vegan.png";
import vegetarianImg from "../../assets/vegetarian.png";
import save from "../../assets/save.svg";

export default function FoodItem({
  id,
  name,
  orderText,
  expiry,
  image,
  location,
  type,
  description,
  vegan,
  vegetarian,
}) {
  return (
    <div className="food-item flex flex-row gap-4 p-4 bg-gray-50 rounded-xl mb-2 w-[92%] h-[100px] max-w-[350px]">
      <img src={`data:image/jpeg;base64,${image}`}width={90} height={90} className="overflow-hidden" />
      <div className="flex flex-col w-full justify-center">
        <div className="flex flex-row gap-2">
          {vegan && <img src={veganImg} width={12} />}
          {vegetarian && <img src={vegetarianImg} width={12} />}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="italic text-lg font-light">{name}</div>
          <img src={save} width={20} />
        </div>
        <div className="flex flex-row justify-between mt-2 items-center">
          <div className="text-sm">Expires in: {expiry} days</div>
          {orderText && <button className="px-3 py-1 rounded-2xl days-to-expiry text-sm">
            {orderText}
          </button>}
        </div>
      </div>
    </div>
  );
}
