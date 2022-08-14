import { Logo, PrimaryButton } from "../components";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-orange-light p-8 border-b border-black flex items-center justify-around">
      {/* Logo */}
      <Logo />

      {/* Menu */}
      <div className="flex items-center justify-evenly">
        <Link to="/login" className="font-bold mr-24">
          Log In
        </Link>
        <PrimaryButton text="Register" onClick={() => navigate("/register")} />
      </div>
    </div>
  );
};

export default Navbar;
