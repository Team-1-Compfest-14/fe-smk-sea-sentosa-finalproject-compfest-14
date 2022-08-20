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
      <div className="my-10 container mx-auto">
        <p className="font-display text-3xl text-center">Learn more, easier.</p>
        <HeroArt className="block mx-auto max-w-screen-sm p-10 lg:max-w-screen-md md:p-0" />
      </div>

      <Divider />

      {/* Student Features */}
      <div className="p-10 md:p-0 container mx-auto">
        <div className="flex items-center justify-around">
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
          <StudentArt className="md:w-1/3 w-1/2" />
        </div>
      </div>

      <Divider />

      {/* Teacher Features */}
      <div className="flex items-center justify-around container mx-auto">
        {/* Left Side */}
        <TeacherLeftArt className="md:w-1/6" />

        {/* Middle */}
        <div>
          <p className="font-bold text-2xl mb-5">Teachers can...</p>
          {teacherFeatures.map((feature, index) => {
            return <FeatureCard feature={feature} index={index} key={index} accentColor="blue" />;
          })}
        </div>
        {/* Right Side */}
        <TeacherRightArt className="w-1/6 hidden md:block" />
      </div>
    </div>
  );
};

export default Home;
