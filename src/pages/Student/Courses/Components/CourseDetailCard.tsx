import { IoChevronBack } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";

const CourseDetailCard = () => (
  <div className="bg-yellow border-2 border-black rounded-3xl mb-8 p-12 flex justify-between">
    <div className="font-mono w-full w-5/6">
      <p className="flex items-center mb-4 text-4xl font-bold">
        <IoChevronBack size={40} className="bg-white rounded-lg border border-black mr-10 p-1" />
        Calculus 1
      </p>
      <div className="bg-white rounded-3xl p-5 font-sans ml-20 border-2 border-black mt-8 mr-5">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat hic ipsa quam? Dicta at
          labore repellat itaque beatae ab natus similique placeat! Beatae fugiat enim animi
          sapiente autem illum? Quisquam? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eum id nihil corporis voluptatem similique ea quia neque? Sunt incidunt odio magnam eius
          sit explicabo, placeat mollitia eum obcaecati rem molestiae.
        </p>
      </div>
    </div>

    <div>
      <p className="flex items-center text-lg font-semibold">
        <GiTeacher className="mr-2" size={20} />
        Berug Kuvukiland
      </p>
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="bg-orange-light rounded-full p-4 border-2 border-black">
          <p>2/5</p>
        </div>
        <p className="mt-2">Lectures</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="bg-orange-light rounded-full p-4 border-2 border-black">
          <p>0/5</p>
        </div>
        <p className="mt-2">Quizzes</p>
      </div>
    </div>
  </div>
);

export default CourseDetailCard;