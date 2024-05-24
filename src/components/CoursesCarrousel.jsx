import CourseCard from "./CourseCard";
import { useState } from "react";
// import { courses } from "../data/coursesData";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const CoursesCarrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const courses = [
    {
      name: "Private Pilot",
      duration: "6 months to 1 year",
      description:
        "The private pilot certificate is the first certification you will receive as a pilot.  You will be granted the privileges of flying an aircraft as the pilot in command and can fly passengers.",
        button: "Become a private pilot",
        href: "/flight-training/private-pilot"
    },
    {
      name: "Instrument Rating",
      duration: "6 months to 1 year",
      description:
        "Being an instrument rated pilot means that you've received training to fly an airplane with sole reference to the flight instruments.  This allows you to safely navigate more challenging weather and makes you a sharper pilot.",
      button: "Become instrument rated",
      href: "/flight-training/instrument-rating"
    },
    {
      name: "Commercial Pilot",
      duration: "3 to 6 months",
      description:
        "Obtaining a commercial pilot certificate allows you to fly for compensation or hire. Start your pilot career and gain flight experience while getting paid to fly.",
      button: "Start your pilot career",
      href: "/flight-training/commercial-pilot"
    },
    {
      name: "Flight Instructor",
      duration: "3 to 6 months",
      description:
        "Many pilots choose to flight instruct to gain experience and teach their art of flying to new student pilots.  Flight instructors train the next generation of future aviators.",
      button: "Become a CFI",
      href: "/flight-training/flight-instructor"
    },
    {
      name: "Multi-Engine Rating",
      duration: "1 to 3 months",
      description:
        "Become a multi-engine rated pilot and learn to fly an aircraft with the highest level of safety and professionalism.  Pilot larger and more complex aircraft with multiple engines.",
      button: "Complete your ME addon",
      href: "/flight-training/multi-engine-rating"
    },
    {
      name: "Airline Transport Pilot",
      duration: "6 months to 1 year",
      description:
        "Become an airline transport pilot and learn to fly an aircraft with the highest level of safety and professionalism.",
      button: "Finish your ATP",
      href: "/flight-training/airline-transport-pilot"
    },
  ];

  const handleRightClick = () => {
    const screenWidth = window.innerWidth;
    const maxIndex =
      screenWidth <= 1020 ? courses.length - 1 : courses.length - 4;
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? maxIndex : prevIndex + 1,
    );
  };

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  return (
    <div className="max-w-7xl mx-auto text-white z-20 relative">
      <div className="flex items-center gap-10 justify-between">
        <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold">
          <span className="text-red-700">Find the right</span> course for you
        </h2>
        <div className="flex gap-4">
          <button
            className="p-2 bg-white hover:bg-red-700 duration-200 rounded-full"
            onClick={handleLeftClick}
          >
            <MdKeyboardArrowLeft className="text-dark-blue size-7" />
          </button>
          <button
            className="p-2 bg-white hover:bg-red-700 duration-200 rounded-full"
            onClick={handleRightClick}
          >
            <MdOutlineKeyboardArrowRight className="text-dark-blue size-7" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden max-w-xl mx-auto lg:max-w-none">
        <div
          className={`flex mt-10 -translate-x-[calc(${currentIndex}*100%)] lg:-translate-x-[calc(${currentIndex}*33.33%)] duration-500`}
        >
          {courses.map((course, index) => (
            <CourseCard {...course} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesCarrousel;
