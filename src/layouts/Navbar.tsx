import { Logo, MenuOption } from "../components";
import { Dropdown } from "./components";

const Navbar = () => {
  const role = "instructor";
  return (
    <div className="bg-orange-light px-10 py-6 border-b border-black flex items-center justify-between top-0 sticky">
      {/* Logo */}
      <Logo />

      {/* Menu */}
      <div className="flex items-center justify-evenly">
        {role === "instructor" ? (
          <>
            <MenuOption text="My Courses" route="/dashboard" />
            <Dropdown />
          </>
        ) : role === "student" ? (
          <>
            <MenuOption text="My Courses" route="/dashboard" />
            <MenuOption text="All Courses" route="/courses" />
            <Dropdown />
          </>
        ) : role === "admin" ? (
          <>
            <MenuOption text="Pending Instructors" route="/instructors" />
            <MenuOption text="Pending Courses" route="/courses" />
            <Dropdown />
          </>
        ) : (
          <>
            <MenuOption text="Log In" route="/login" />
            <MenuOption
              text="Register"
              route="/register"
              style="bg-blue px-4 py-2 text-white rounded-lg border border-black cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
