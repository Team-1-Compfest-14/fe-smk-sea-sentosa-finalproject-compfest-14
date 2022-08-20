import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../../hooks";
import { enrolledCourses, UserDetails } from "../../../typings";
import { StudentDashboardHeaderCard, CourseCardWithProgressBar } from "./Components";
import { BASE_URL, refreshAuthLogic } from "../../../api";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const StudentDashboard = () => {
  useDocumentTitle("Dashboard | Pelajarin");

  const [enrolledCourses, setEnrolledCourses] = useState<enrolledCourses[] | []>([]);
  const [showCompleteCourses, setShowCompleteCourses] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [totalActive, setTotalActive] = useState<number>(0);
  const [totalComplete, setTotalComplete] = useState<number>(0);

  const fetchData = () => {
    axios
      .get(`${BASE_URL}/courses/dashboard/progress`)
      .then((res) => {
        const { dashboardDatas } = res.data.data;
        setEnrolledCourses(dashboardDatas);
        let totalActive = 0;
        let totalComplete = 0;
        dashboardDatas.map((course: enrolledCourses) => {
          if (course.isComplete) {
            totalComplete++;
          } else {
            totalActive++;
          }
        });
        setTotalActive(totalActive);
        setTotalComplete(totalComplete);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchUser = () => {
    axios
      .get(`${BASE_URL}/users/profile`)
      .then((res) => {
        const { user } = res.data.data;
        setUserDetails(user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    fetchData();
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto p-10 max-w-screen-lg">
      <StudentDashboardHeaderCard
        name={userDetails?.name!}
        totalActive={totalActive}
        totalComplete={totalComplete}
      />
      <div className="flex w-full items-center justify-evenly my-8">
        <button
          onClick={() => {
            setShowCompleteCourses(false);
          }}
          className={`px-4 py-2 bg-slate-200 rounded-lg ${
            !showCompleteCourses && "bg-yellow rounded-lg border border-black text-black"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => {
            setShowCompleteCourses(true);
          }}
          className={`px-4 py-2 bg-slate-200 rounded-lg ${
            showCompleteCourses && "bg-orange-dark rounded-lg border border-black text-black"
          }`}
        >
          Completed
        </button>
      </div>
      {showCompleteCourses && enrolledCourses
        ? enrolledCourses
            .filter((item) => item.isComplete === true)
            .map((item, index) => (
              <CourseCardWithProgressBar
                key={index}
                name={item.name}
                teacher={item.teacher}
                totalModuleCompletion={item.totalModuleCompletion}
                totalModule={item.totalModule}
                isComplete={item.isComplete}
                courseId={item.courseId}
              />
            ))
        : enrolledCourses
            .filter((item) => item.isComplete === false)
            .map((item, index) => (
              <CourseCardWithProgressBar
                key={index}
                name={item.name}
                teacher={item.teacher}
                totalModuleCompletion={item.totalModuleCompletion}
                totalModule={item.totalModule}
                isComplete={item.isComplete}
                courseId={item.courseId}
              />
            ))}
    </div>
  );
};

export default StudentDashboard;
