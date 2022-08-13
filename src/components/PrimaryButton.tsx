interface ButtonProps {
  text: string;
}

const style = "bg-blue px-4 py-2 text-white rounded-lg border border-black";

const PrimaryButton = ({ text }: ButtonProps) => {
  return <p className={style}>{text}</p>;
};

export default PrimaryButton;
