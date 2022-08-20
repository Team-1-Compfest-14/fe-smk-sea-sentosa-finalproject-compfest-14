import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto flex flex-col items-center justify-center my-16 max-w-screen-lg gap-4">
      <p className="text-xl font-bold text-center">
        Oops, the page you try to access does not exist. :(
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue text-white border border-black px-4 py-2 rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Page404;
