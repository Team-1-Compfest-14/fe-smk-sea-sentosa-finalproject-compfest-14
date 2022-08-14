import { useDocumentTitle } from "../../hooks";
import { HeroArt, StudentArt, TeacherLeftArt, TeacherRightArt } from "./assets";
import { Divider, FeatureCard } from "./components";

const Home = () => {
  const studentFeatures: string[] = [
    "Study materials from various courses in this site.",
    "Test their understanding by doing practice questions on the topic.",
    "Boost their knowledge by accessing the answer keys of the practice questions."
  ];

  const teacherFeatures: string[] = [
    "Serve lectures in an online format.",
    "Add quizzes to each lecture inside a course.",
    "Share their knowledge in a more efficient way."
  ];

  useDocumentTitle("Pelajarin | Learn more, easier.");

  return (
    <div>
      {/* Hero */}
      <div className="my-10 block">
        <p className="font-display text-3xl mb-10 text-center">Learn more, easier.</p>
        <HeroArt className="w h-1/2 block mx-auto" />
      </div>

      <Divider />

      {/* Student Features */}
      <div className="mx-48 my-16">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="w-1/2">
            <p className="font-bold text-2xl mb-5">Students can...</p>
            {studentFeatures.map((feature, index) => {
              return (
                <FeatureCard
                  feature={feature}
                  index={index}
                  key={index}
                  accentColor="orange-light"
                />
              );
            })}
          </div>
          {/* Right Side */}
          <StudentArt className="w-1/4 h-1/3" />
        </div>
      </div>

      <Divider />

      {/* Teacher Features */}
      <div className="flex items-center justify-around">
        {/* Left Side */}
        <TeacherLeftArt className="w-1/6" />

        {/* Middle */}
        <div>
          <p className="font-bold text-2xl mb-5">Teachers can...</p>
          {teacherFeatures.map((feature, index) => {
            return (
              // Known bug: brownnya suka ngga keluar
              <FeatureCard feature={feature} index={index} key={index} accentColor="brown" />
            );
          })}
        </div>
        {/* Right Side */}
        <TeacherRightArt className="w-1/6" />
      </div>

      <Divider />
    </div>
  );
};

export default Home;
