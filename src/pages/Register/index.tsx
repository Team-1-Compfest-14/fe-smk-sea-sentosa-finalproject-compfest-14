import React from "react";
import { useDocumentTitle } from "../../hooks";
import { Divider } from "../Home/components";

const Register = () => {
  useDocumentTitle("Register | Pelajarin");

  return (
    <div>
      <div className="px-8 py-16">
        <p className="text-center text-xl font-bold mb-10">
          Register to get the full benefit of Pelajarin.
        </p>
        {/* Form */}
        <div className="p-10 border-2 border-black w-1/3 rounded-xl mx-auto">
          <form>
            <div className="mb-4">
              <label htmlFor="roles">Role</label>
              <select name="roles" className="py-3 pl-4 border-2 border-black rounded-xl w-full">
                <option value={"Student"}>Student</option>
                <option value={"Instructor"}>Instructor</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <br />
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="py-3 pl-4 border-2 border-black rounded-xl w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <br />
              <input
                name="email"
                type="email"
                placeholder="email@email.com"
                className="py-3 pl-4 border-2 border-black rounded-xl w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password1">Password</label>
              <br />
              <input
                name="password1"
                type="password"
                placeholder="Make sure it's a strong one"
                className="py-3 pl-4 border-2 border-black rounded-xl w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password2">Confirm Password</label>
              <br />
              <input
                name="password2"
                type="password"
                placeholder="Confirm your password"
                className="py-3 pl-4 border-2 border-black rounded-xl w-full"
              />
            </div>
          </form>
          <div className="flex items-center justify-end mt-4">
            <button className="bg-blue text-white px-4 py-3 border-2 border-black rounded-full">
              Register
            </button>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Register;
