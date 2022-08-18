import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";

function AdminVerifyInstructors() {
  const [instructors, setInstructors]: any = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire]: any = useState("");
  const [loading, setLoading]: any = useState(true);

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
    setLoading(false);
  };

  useEffect(() => {
    getUnverifiedInstructor();
  }, []);

  return (
    <>
      <h1 className="bg-green p-10 text mt-9 w-5/6 m-auto text-black font-bold text-3xl rounded-md border-black border-2">
        Pending Instructors
      </h1>
      {/* <button onClick={getUnverifiedInstructor}>Click us</button> */}
      {loading ? (
        <h1>kontol</h1>
      ) : (
        instructors.map((instructor: any, index: any) => {
          return (
            <>
              <h1>{instructor.email}</h1>
              <h1>{index}</h1>
              <h1>KONTOL BADAG</h1>
            </>
          );
        })
      )}
    </>
  );
}

export default AdminVerifyInstructors;
