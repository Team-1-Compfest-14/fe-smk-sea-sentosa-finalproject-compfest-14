import { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

const Dropdown = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="relative" onClick={() => setShowDropDown(!showDropDown)}>
      <button
        className="flex items-center justify-center bg-slate-100 px-4 py-2 font-bold rounded-lg border border-black hover:bg-slate-300"
        onClick={() => {}}
      >
        <FaChalkboardTeacher size={28} className="mr-2" />
        Welcome
      </button>
      <div
        className={`absolute bg-slate-100 mt-2 w-full p-4 border border-black rounded-lg ${
          showDropDown ? "" : "hidden"
        }`}
      >
        <button className="p-2 hover:bg-slate-200 hover:rounded-lg" onClick={() => {}}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
