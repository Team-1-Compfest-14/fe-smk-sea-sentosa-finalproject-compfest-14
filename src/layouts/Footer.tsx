import { Logo } from "../components";

const Footer = () => {
  return (
    <div className="p-16 flex items-center justify-between bg-slate-200 border-t-2 border-black">
      <div>
        <Logo />
        <p className="text-xs mt-3">© Team 1 Compfest 14</p>
      </div>
    </div>
  );
};

export default Footer;
