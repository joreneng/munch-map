import "./index.css";
import { useState } from "react";

export default function FilterLocationBtn({ name, handleSelect, curActive }) {
  return (
    <button
      className={"px-3 py-1 rounded-3xl border-2 text-sm text-gray-600".concat(
        name === curActive ? " active-filter" : ""
      )}
      onClick={() => {
        handleSelect(name);
      }}
    >
      {name}km
    </button>
  );
}
