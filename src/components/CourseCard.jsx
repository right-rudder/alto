const CourseCard = ({ name, duration, description, button, href }) => {
  return (
    <div className="flex-[0_0_100%] lg:flex-[0_0_33.33%] px-7 group">
      <div className="bg-white p-8 lg:p-16 text-dark-blue flex flex-col gap-3 h-full justify-between ">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">{name}</h1>
          <h2 className="font-semibold">Duration: {duration}</h2>
          <p className="paragraph text-base font-light">{description}</p>
        </div>
        <div className="flex self-start pt-10">
          <a
            href={href}
            className="btn-red font-bold text-white px-5 py-3 hover:text-red-700 hover:border border-gray-200 group-hover:scale-105 text-sm duration-200"
          >
            {button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
