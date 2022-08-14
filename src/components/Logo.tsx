import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="cursor-pointer">
      <p className="font-display text-2xl font-extrabold">Pelajarin</p>
      <p className="font-display text-xs">by SMK SEA Sentosa</p>
    </Link>
  );
};

export default Logo;
