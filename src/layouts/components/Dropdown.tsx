import axios from "axios";
import { useContext, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api";
import { LoginContext } from "../../context";

const Dropdown = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .delete(`${BASE_URL}/auth/logout`)
      .then(() => {
        localStorage.removeItem("accessToken");
        setUser({ accessToken: null });
        alert("Successfully logged out!");
      })
      .catch((err) => console.log(err));
  };

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
        <button
          className="p-2 hover:bg-slate-200 hover:rounded-lg"
          onClick={() => {
            handleLogout();
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
