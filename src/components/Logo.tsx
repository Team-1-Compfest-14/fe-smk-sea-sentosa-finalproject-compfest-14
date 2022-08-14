import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className="cursor-pointer">
      <p className="font-display text-2xl font-extrabold">Pelajarin</p>
      <p className="font-display text-xs">by SMK SEA Sentosa</p>
    </div>
  );
};

export default Logo;
