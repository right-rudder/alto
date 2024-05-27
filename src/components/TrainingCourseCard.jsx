const TrainingCourseCard = ({ name, duration, description, button, href }) => {
  return (
    <div className="group h-full">
      <div className="bg-white p-8 lg:p-16 text-dark-blue flex flex-col gap-3 justify-between h-full">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">{name}</h1>
          <h2 className="font-semibold text-gray-700">Duration: {duration}</h2>
          <p className="paragraph text-base font-normal">{description}</p>
        </div>

        <a
          href={href}
          className="btn-red mt-5 font-bold text-white px-5 py-4 w-full hover:text-red-700 hover:border border-gray-200 group-hover:scale-105 text-sm duration-200"
        >
          {button}
        </a>
      </div>
    </div>
  );
};

export default TrainingCourseCard;
