import { IoIosArrowForward } from "react-icons/io";

const NavLink = ({ menuItem, pathname, toggled, onShow }) => {
  const isActive =
    menuItem.submenu.some(
      (item) => item.link === pathname || item.link + "/" === pathname,
    ) ||
    menuItem.link === pathname ||
    menuItem.link + "/" === pathname;

  let linkOrDropdown;
  if (menuItem.submenu.length === 0) {
    linkOrDropdown = (
      <a
        name={menuItem.name}
        href={menuItem.link}
        className={`cursor-pointer font-semibold text-sm xl:text-base tracking-widest duration-300 hover:text-mustard-yellow py-12 border-main-red whitespace-nowrap uppercase ${
          isActive ? "text-mustard-yellow" : "text-white"
        }`}
      >
        {menuItem.name}
      </a>
    );
  } else {
    linkOrDropdown = (
      <a
        name={menuItem.name}
        className={`font-semibold cursor-default text-sm xl:text-base tracking-widest duration-300 hover:text-mustard-yellow py-12 border-main-red whitespace-nowrap uppercase ${
          isActive ? "text-mustard-yellow" : "text-white"
        }`}
      >
        {menuItem.name}
      </a>
    );
  }
  return (
    <div className="relative" onMouseEnter={onShow} onMouseLeave={onShow}>
      {linkOrDropdown}
      <div
        className={`overflow-hidden ${
          toggled ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
        } w-64 duration-700 ease-in-out absolute bg-white flex flex-col whitespace-nowrap top-[61px]`}
      >
        {menuItem.submenu.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className={`${
              item.link === pathname || item.link + "/" === pathname
                ? "bg-mustard-yellow/50 text-dark-blue"
                : "text-gray-500"
            } my-2 mx-5 px-3 py-2 hover:bg-mustard-yellow/15 font-medium group duration-200 hover:text-dark-blue first:mt-8 last:mb-8 flex items-center justify-between`}
          >
            <p>{item.name}</p>
            <IoIosArrowForward className="text-dark-blue opacity-0 group-hover:opacity-100 duration-200" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavLink;
