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
      duration: "6 months",
      description:
        "Become a private pilot and learn to fly an aircraft with the highest level of safety and professionalism.",
    },
    {
      name: "Commercial Pilot",
      duration: "12 months",
      description:
        "Become a commercial pilot and learn to fly an aircraft with the highest level of safety and professionalism.",
    },
    {
      name: "Airline Transport Pilot",
      duration: "18 months",
      description:
        "Become an airline transport pilot and learn to fly an aircraft with the highest level of safety and professionalism.",
    },
    {
      name: "Multi-Engine Rating",
      duration: "6 months",
      description:
        "Become a multi-engine rated pilot and learn to fly an aircraft with the highest level of safety and professionalism.",
    },
    {
      name: "Flight Instructor",
      duration: "6 months",
      description:
        "Become a flight instructor and learn to fly an aircraft with the highest level of safety and professionalism.",
    },
    {
      name: "Instrument Rating",
      duration: "6 months",
      description:
        "Become an instrument rated pilot and learn to fly an aircraft with the highest level of safety and professionalism.",
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
