import axios from "axios";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../../api";

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
  async (config: any) => {
    const currentDate = new Date();
    const accessToken = localStorage.getItem("accessToken");

    const decoded = jwt_decode(accessToken!);
    const { exp }: any = decoded;

    if (exp * 1000 < currentDate.getTime()) {
      await axios
        .post(`${BASE_URL}/auth/refresh`)
        .then((response) => {
          const { accessToken } = response.data.data;
          config.headers.Authorization = `Bearer ${accessToken}`;
          localStorage.setItem("accessToken", accessToken);
        })
        .catch((err) => {
          if (err.response.data.message === "You don't have an account session") {
            localStorage.removeItem("accessToken");
          }
        });
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosJWT;
