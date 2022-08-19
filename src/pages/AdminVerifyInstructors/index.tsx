import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";

function AdminVerifyInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire]: any = useState("");

  // const refreshToken = async () => {
  //   const response = await axios.get("http://localhost:8080/auth/refresh");
  //   const { accessToken } = response.data.data;
  //   setToken(accessToken);
  //   const decoded = jwt_decode(accessToken);
  //   const { exp }: any = decoded;
  //   setExpire(exp);
  // };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config: any) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        // expired access token
        const response = await axios.post("http://localhost:8080/auth/refresh");
        const { accessToken } = response.data.data;
        config.headers.Authorization = `Bearer ${accessToken}`;
        setToken(accessToken);
        const decoded = jwt_decode(accessToken);
        const { exp }: any = decoded;
        setExpire(exp);
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const getUnverifiedInstructor = async () => {
    const response = await axiosJWT.get("http://localhost:8080/approval/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { users } = response.data.data;
    setInstructors(users);
    console.log(instructors);
  };

  const useEffectAsync = (effect: any, inputs: any) => {
    useEffect(() => {
      effect();
    }, inputs);
  };

  useEffectAsync(async () => {
    await getUnverifiedInstructor();
  }, []);

  return (
    <>
      <button onClick={getUnverifiedInstructor}>Click us</button>
      {instructors.map((instructor: any, index: any) => {
        <h1>{instructor.email}</h1>;
        <h1>{index}</h1>;
      })}
    </>
  );
}

export default AdminVerifyInstructors;
