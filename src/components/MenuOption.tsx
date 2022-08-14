import { Link } from "react-router-dom";

interface MenuOptionProps {
  text: string;
  route: string;
  style: string;
}

const MenuOptionButton = ({ text, route, style }: MenuOptionProps) => {
  return (
    <Link to={route} className={style}>
      {text}
    </Link>
  );
};

export default MenuOptionButton;
