import "./index.css";
import { useState } from "react";

export default function FilterBtn({ name, handleSelect }) {
  const [active, setActive] = useState(false);
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
