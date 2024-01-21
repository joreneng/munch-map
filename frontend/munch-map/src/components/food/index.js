import save from "../../assets/save.svg";
import React, { useState, useEffect, useRef } from "react";

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
  const expiryDay = useRef();
  useEffect(() => {
    if (expiry <= 2) {
      expiryDay.current.style.backgroundColor = "#C8553D";
    } else if (expiry <= 5) {
      expiryDay.current.style.backgroundColor = "#F28F3B";
    } else {
      expiryDay.current.style.backgroundColor = "#588B88";
    }
  }, []);
  return (
    <div className="food-card relative flex flex-col w-[92%] max-w-[350px] h-[320px] rounded-3xl bg-gray-50 overflow-hidden mx-auto mt-">
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
        <div ref={expiryDay} className="px-3 py-1 rounded-2xl text-sm">
          Expires in: {expiry} days
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
