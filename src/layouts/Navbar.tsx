import Logo from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";

const Navbar = () => {
  return (
    <div className="bg-orange-light p-8 border-b border-black flex items-center justify-around">
      {/* Logo */}
      <Logo />

      {/* Menu */}
      <div className="flex items-center justify-evenly">
        <p className="font-bold mr-24">Log In</p>
        <PrimaryButton text="Register" />
      </div>
    </div>
  );
};

export default Navbar;
