/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../../hooks";
import { enrolledCourses, studentDashboardHeader } from "../../../typings";
import { StudentDashboardHeaderCard, CourseCardWithProgressBar } from "./Components";

const StudentDashboard = () => {
  useDocumentTitle("Dashboard | Pelajarin");

  const [enrolledCourses, setEnrolledCourses] = useState<enrolledCourses[] | []>([]);
  const [showCompleteCourses, setShowCompleteCourses] = useState(false);
  const [headerData, setHeaderData] = useState<studentDashboardHeader>();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
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
        .catch((err) => {
          if (err.response.data.message === "JWT expired") {
            axios
              .post("http://localhost:5000/auth/refresh", {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              })
              .then((res) => {
                localStorage.setItem("accessToken", res.data.data.accessToken);
                fetchData();
              });
          } else {
            console.log(err);
            alert("Error");
          }
        });
    };

    fetchData();
  }, []);

  // const enrolledCourses = [
  //   {
  //     name: "Introduction to Computer Science",
  //     instructorName: "John Doe",
  //     completeSection: 5,
  //     totalSection: 10,
  //     isComplete: false
  //   },
  //   {
  //     name: "Introduction to Backend",
  //     instructorName: "John Doe",
  //     completeSection: 6,
  //     totalSection: 10,
  //     isComplete: false
  //   },
  //   {
  //     name: "Introduction to REST API",
  //     instructorName: "John Doe",
  //     completeSection: 6,
  //     totalSection: 6,
  //     isComplete: true
  //   }
  // ];

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="w-2/3">
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
    </div>
  );
};

export default StudentDashboard;
