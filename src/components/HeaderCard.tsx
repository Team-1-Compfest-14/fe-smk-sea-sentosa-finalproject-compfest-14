import { CellArt } from "../assets";

interface HeaderCardProps {
  name: string;
}

const HeaderCard = ({ name }: HeaderCardProps) => {
  return (
    <div className="bg-orange-light border border-black rounded-3xl w-full flex justify-between items-center overflow-clip mb-4">
      <p className="text-4xl font-bold ml-10 max-w-md">{name}&apos;s Courses</p>
      <CellArt />
    </div>
  );
};

export default HeaderCard;
