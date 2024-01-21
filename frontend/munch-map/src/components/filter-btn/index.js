import "./index.css";
import { useState } from "react";

export default function FilterBtn({ name, handleSelect, curActive }) {
  const [active, setActive] = useState(curActive);
  return (
    <button
      className={"px-3 py-1 rounded-3xl border-2 text-sm text-gray-600".concat(
        active ? " active-filter" : ""
      )}
      onClick={() => {
        handleSelect(name, active);
        setActive(!active);
      }}
    >
      {name}
    </button>
  );
}
