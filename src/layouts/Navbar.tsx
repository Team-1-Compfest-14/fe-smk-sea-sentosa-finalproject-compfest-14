import { Logo, MenuOption } from "../components";

const Navbar = () => {
  return (
    <div className="bg-orange-light p-8 border-b border-black flex items-center justify-around">
      {/* Logo */}
      <Logo />

      {/* Menu */}
      <div className="flex items-center justify-evenly">
        <MenuOption text="Log In" route="/register" style="font-bold mr-24" />
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
