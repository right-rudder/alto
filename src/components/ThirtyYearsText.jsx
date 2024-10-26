import CountUp from "react-countup";

const ThirtyYearsText = () => {
  return (
    <h2 className="text-center text-3xl lg:text-5xl pb-10">
      <CountUp end={30} duration={4} enableScrollSpy scrollSpyDelay={200} />
      <span>
        &nbsp;years of <br className="lg:hidden" />
        professional pilot training
      </span>
    </h2>
  );
};

export default ThirtyYearsText;
