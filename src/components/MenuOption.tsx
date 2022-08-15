import { Link } from "react-router-dom";
import { SiGitbook } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

interface MenuOptionProps {
  text: string;
  route: string;
  style?: string;
  useIcon?: "instructor" | "admin" | "student";
}

const MenuOptionButton = ({ text, route, style, useIcon }: MenuOptionProps) => {
  return (
    <Link to={route} className={style ?? "font-bold mr-24"}>
      <div className="flex items-center justify-center">
        {useIcon &&
          (useIcon === "instructor" ? (
            <FaChalkboardTeacher size={28} className="mr-2" />
          ) : useIcon === "admin" ? (
            <MdAdminPanelSettings size={28} className="mr-2" />
          ) : (
            <SiGitbook size={28} className="mr-2" />
          ))}
        {text}
      </div>
    </Link>
  );
};

export default MenuOptionButton;
