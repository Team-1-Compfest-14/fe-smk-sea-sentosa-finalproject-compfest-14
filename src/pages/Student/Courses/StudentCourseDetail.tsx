import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CourseDetailCard, SimpleCourseCard } from "./Components";
import { useDocumentTitle } from "../../../hooks";

interface itemsInterface {
  name: string;
  isComplete: boolean;
}

interface quizItemsInterface extends itemsInterface {
  numOfQuestions: number;
}

const StudentCourseDetail = () => {
  useDocumentTitle("All Verified Courses | Pelajarin");

  const [showQuizzes, setShowQuizzes] = useState(true);

  const lectureItems: itemsInterface[] = [
    {
      name: "Introduction to Computer Science",
      isComplete: false
    },
    {
      name: "Introduction to Backend",
      isComplete: true
    }
  ];

  const quizItems: quizItemsInterface[] = [
    {
      name: "Quiz Computer Science",
      numOfQuestions: 10,
      isComplete: false
    },
    {
      name: "Quiz Backend",
      numOfQuestions: 5,
      isComplete: true
    }
  ];

  useEffect(() => {
    const { courseId } = useParams();
    console.log(courseId);
  }, []);

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="w-2/3">
        <CourseDetailCard />

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

        {showQuizzes
          ? lectureItems.map((item, index) => (
              <SimpleCourseCard
                key={index}
                courseNumber={index + 1}
                name={item.name}
                isComplete={item.isComplete}
              />
            ))
          : quizItems.map((item, index) => (
              <SimpleCourseCard
                key={index}
                courseNumber={index + 1}
                name={item.name}
                numOfQuestions={item.numOfQuestions}
                isComplete={item.isComplete}
              />
            ))}
      </div>
    </div>
  );
};

export default StudentCourseDetail;
