/* eslint-disable no-unused-vars */
import axios from "axios";

export const BASE_URL = "http://localhost:5000";

// Based on https://www.npmjs.com/package/axios-auth-refresh
export const refreshAuthLogic = (failedRequest: any) =>
  axios.post(`${BASE_URL}/auth/refresh`).then((tokenRefreshResponse) => {
    const { accessToken } = tokenRefreshResponse.data.data;
    localStorage.setItem("accessToken", accessToken);
    failedRequest.response.config.headers["Authorization"] = "Bearer " + accessToken;
    return Promise.resolve();
  });
