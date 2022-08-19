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

  const approveHandlingData = async (event: any, userId: any, status: any) => {
    console.log("hello");
    await axiosJWT.post(
      `http://localhost:8080/approval/users/${userId}`,
      { approved: status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const response = await axiosJWT.get("http://localhost:8080/approval/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { users } = response.data.data;
    setInstructors(users);
  };

  useEffect(() => {
    getUnverifiedInstructor();
  }, []);

  return (
    <>
      <h1 className="bg-green p-10 text mt-9 w-5/6 m-auto text-black font-bold text-3xl rounded-md border-black border-2">
        Pending Instructors
      </h1>

      {instructors === [] && <h1 className="text-center">Not Data Founds</h1>}

      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        instructors.map((instructor: any) => {
          return (
            <>
              <div className="bg-white border border-black rounded-xl px-8 py-2 flex items-center justify-between mt-8 w-4/6 m-auto mb-8">
                <div className="my-auto flex justify-between items-center">
                  <div className="ml-6">
                    <p className="text-2xl font-bold">{instructor.email}</p>
                    <p className="flex items-center">{instructor.name}</p>
                  </div>
                </div>
                <div className="flex justify-end mr-6">
                  <button
                    className="bg-blue hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-6"
                    onClick={(e) => approveHandlingData(e, instructor.id, true)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => approveHandlingData(e, instructor.id, false)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </>
          );
        })
      )}
    </>
  );
}

export default AdminVerifyInstructors;
