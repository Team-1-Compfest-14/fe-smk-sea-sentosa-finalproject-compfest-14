import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../../hooks";
import { enrolledCourses, studentDashboardHeader } from "../../../typings";
import { StudentDashboardHeaderCard, CourseCardWithProgressBar } from "./Components";
import axiosJWT from "../axiosJWT";

const StudentDashboard = () => {
  useDocumentTitle("Dashboard | Pelajarin");

  const [enrolledCourses, setEnrolledCourses] = useState<enrolledCourses[] | []>([]);
  const [showCompleteCourses, setShowCompleteCourses] = useState(false);
  const [headerData, setHeaderData] = useState<studentDashboardHeader>();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      await axiosJWT
        .get("http://localhost:5000/courses/dashboard/progress", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
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
          setHeaderData({
            name: "John Doe",
            totalActive,
            totalComplete
          });
        })
        .catch(async (err) => {
          console.log(err);
          alert("Error");
        });
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-10 max-w-screen-lg">
      <StudentDashboardHeaderCard {...headerData!} />
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
