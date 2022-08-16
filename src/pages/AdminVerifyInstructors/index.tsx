import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";

function AdminVerifyInstructors() {
  const [instructor, setInstructor] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire]: any = useState("");
  const [roleUser, setRoleUser] = useState(null);

  const refreshToken = async () => {
    const response = await axios.get("http://localhost:8080/token");
    const { accessToken } = response.data.data;
    setToken(accessToken);
    const decoded = jwt_decode(accessToken);
    const { role, exp }: any = decoded;
    setRoleUser(role);
    setExpire(exp);
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config: any) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        // expired access token
        const response = await axios.get("http://localhost:8080/token");
        const { accessToken } = response.data.data;
        config.headers.Authorization = `Bearer ${accessToken}`;
        setToken(accessToken);
        const decoded = jwt_decode(accessToken);
        const { role, exp }: any = decoded;
        setRoleUser(role);
        setExpire(exp);
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    refreshToken();
  }, []);

  return <div>AdminVerifyInstructors</div>;
}

export default AdminVerifyInstructors;
