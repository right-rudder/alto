const CourseCard = ({ name, duration, description }) => {
  return (
    <div className="flex-[0_0_100%] lg:flex-[0_0_33.33%] px-7">
      <div className="bg-white p-8 lg:p-16 text-dark-blue flex flex-col gap-3 h-full justify-between ">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl">{name}</h1>
          <h2 className="font-semibold">Duration: {duration}</h2>
          <p className="paragraph">{description}</p>
        </div>
        <div className="flex self-end">
          <a
            href=""
            className="font-bold text-red-700 hover:text-dark-blue duration-200"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
