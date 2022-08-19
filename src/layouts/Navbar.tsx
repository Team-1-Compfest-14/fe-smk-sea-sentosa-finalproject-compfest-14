import { useContext } from "react";
import { Logo, MenuOption } from "../components";
import { LoginContext } from "../context";
import { Dropdown } from "./components";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const { user } = useContext(LoginContext);
  if (user?.accessToken) {
    const decoded = jwt_decode(user?.accessToken!);
    const { role }: any = decoded;
    return (
      <div className="bg-orange-light px-10 py-6 border-b border-black flex items-center justify-between top-0 sticky">
        {/* Logo */}
        <Logo />

        {/* Menu */}
        <div className="flex items-center justify-evenly">
          {role === 0 ? (
            <>
              <MenuOption text="My Courses" route="/student/dashboard" />
              <MenuOption text="All Courses" route="/student/courses" />
              <Dropdown />
            </>
          ) : role === 1 ? (
            <>
              <MenuOption text="My Courses" route="/instructor/dashboard" />
              <Dropdown />
            </>
          ) : (
            <>
              <MenuOption text="Pending Instructors" route="/instructors" />
              <MenuOption text="Pending Courses" route="/courses" />
              <Dropdown />
            </>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-orange-light px-10 py-6 border-b border-black flex items-center justify-between top-0 sticky">
      {/* Logo */}
      <Logo />
      <div className="flex items-center justify-evenly">
        <MenuOption text="Log In" route="/login" />
        <MenuOption
          text="Register"
          route="/register"
          style="bg-blue px-4 py-2 text-white rounded-lg border border-black cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
