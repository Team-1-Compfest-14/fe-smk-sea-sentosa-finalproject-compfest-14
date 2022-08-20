import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseDetailCard, SimpleCourseCard } from "./Components";
import { useDocumentTitle } from "../../../hooks";
import axiosJWT from "../axiosJWT";
import {
  StudentLectureDetailInterface,
  StudentQuizDetailInterface,
  StudentCourseDetailHeaderInterface
} from "../../../typings";

const StudentCourseDetail = () => {
  useDocumentTitle("Course Detail | Pelajarin");
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [lectures, setLectures] = useState<StudentLectureDetailInterface[] | []>([]);
  const [quizzes, setQuizzes] = useState<StudentQuizDetailInterface[] | []>([]);
  const [showQuizzes, setShowQuizzes] = useState(true);
  const [detailCourseHeader, setDetailCourseHeader] =
    useState<StudentCourseDetailHeaderInterface>();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      await axiosJWT
        .get(`http://localhost:5000/courses/verified/${courseId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => {
          const { course } = res.data.data;

          setDetailCourseHeader({
            name: course.course.name,
            instructorName: course.instructorName,
            description: course.course.description,
            totalLectures: course.totalLectures,
            totalCompleteLectures: course.totalCompleteLectures,
            totalQuizzes: course.totalQuizzes,
            totalCompleteQuizzes: course.totalCompleteQuizzes
          });

          const tempLectures: StudentLectureDetailInterface[] = [];

          course.lectures.map((item: any) => {
            tempLectures.push({
              id: item.lecture.id,
              name: item.lecture.name,
              order: item.lecture.order,
              lectureLink: item.lecture.lecture.lectureLink,
              isComplete: item.isComplete
            });
          });

          setLectures(tempLectures);

          const tempQuizzes: StudentQuizDetailInterface[] = [];
          course.quizzes.map((item: any) => {
            tempQuizzes.push({
              id: item.quiz.quiz.id,
              name: item.quiz.name,
              order: item.quiz.order,
              isComplete: item.isComplete
            });
          });

          setQuizzes(tempQuizzes);
        })
        .catch(async () => {
          alert("Error");
        });
    };

    fetchData();
  }, []);

  const handleQuizz = (quizId: number, isComplete: boolean) => {
    if (isComplete) {
      navigate(`/student/courses/${courseId}/quizzes/${quizId}/feedback`);
    } else {
      navigate(`/student/courses/${courseId}/quizzes/${quizId}`);
    }
  };

  const handleLecture = async (lectureId: number, lectureLink: string, isComplete: boolean) => {
    if (!isComplete) {
      await axiosJWT.post(
        `http://localhost:5000/courses/lectures/${lectureId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
    }
    window.open(lectureLink, "_blank");
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="w-2/3">
        <CourseDetailCard {...detailCourseHeader!} />

        <div className="flex w-full items-center justify-evenly my-8">
          <button
            onClick={() => {
              setShowQuizzes(true);
            }}
            className={`px-4 py-2 bg-slate-200 rounded-lg ${
              showQuizzes && "bg-yellow rounded-lg border border-black text-black"
            }`}
          >
            Lectures
          </button>
          <button
            onClick={() => {
              setShowQuizzes(false);
            }}
            className={`px-4 py-2 bg-slate-200 rounded-lg ${
              !showQuizzes && "bg-yellow rounded-lg border border-black text-black"
            }`}
          >
            Quizzes
          </button>
        </div>

        {showQuizzes && quizzes && lectures
          ? lectures.map((item, index) => (
              <SimpleCourseCard
                key={index}
                id={item.id}
                courseNumber={index + 1}
                name={item.name}
                isComplete={item.isComplete}
                isQuiz={false}
                handleLecture={handleLecture}
                lectureLink={item.lectureLink}
              />
            ))
          : quizzes.map((item, index) => (
              <SimpleCourseCard
                key={index}
                id={item.id}
                courseNumber={index + 1}
                name={item.name}
                isComplete={item.isComplete}
                isQuiz={true}
                handleQuiz={handleQuizz}
              />
            ))}
      </div>
    </div>
  );
};

export default StudentCourseDetail;
