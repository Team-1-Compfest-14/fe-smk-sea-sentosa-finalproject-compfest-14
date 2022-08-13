import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "../../layouts";
import { Home, Register, Login } from "../../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
