import { VerifiedCourseCard, StudentCourseCard } from "./Components";
import { useDocumentTitle } from "../../../hooks";

const StudentCourses = () => {
  useDocumentTitle("All Verified Courses | Pelajarin");

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="w-2/3">
        <VerifiedCourseCard />
        <StudentCourseCard
          courseName="Itadakimas"
          instructorName="Rafi Priatna K"
          numOfSections={5}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>
    </div>
  );
};

export default StudentCourses;
