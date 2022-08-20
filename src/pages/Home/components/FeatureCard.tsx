interface FeatureCardProp {
  feature: string;
  index: number;
  accentColor: string;
}

const FeatureCard = ({ index, feature, accentColor }: FeatureCardProp) => {
  return (
    <div className="flex items-center mb-2">
      <p
        className={`bg-${accentColor} ${
          accentColor === "blue" && "text-white"
        } border border-black w-10 h-10 flex justify-center items-center rounded-full mr-8`}
      >
        {index + 1}
      </p>
      <p className="bg-black text-white p-5 rounded-2xl max-w-sm">{feature}</p>
    </div>
  );
};

export default FeatureCard;
