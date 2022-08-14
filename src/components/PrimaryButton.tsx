interface ButtonProps {
  text: string;
  onClick: () => void;
}

const style = "bg-blue px-4 py-2 text-white rounded-lg border border-black cursor-pointer";

const PrimaryButton = ({ text, onClick }: ButtonProps) => {
  return (
    <p className={style} onClick={onClick}>
      {text}
    </p>
  );
};

export default PrimaryButton;
