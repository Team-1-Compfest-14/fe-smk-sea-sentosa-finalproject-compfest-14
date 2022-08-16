import { PropsWithChildren } from "react";

const Modal = ({ children }: PropsWithChildren) => {
  return (
    // Backdrop
    <div className="backdrop-brightness-50 backdrop-blur-sm w-screen h-screen fixed flex justify-center items-center top-0 left-0">
      {/* Modal */}
      <div className="fixed bg-white p-10 rounded-xl container max-w-lg border border-black">
        {children}
      </div>
    </div>
  );
};

export default Modal;
