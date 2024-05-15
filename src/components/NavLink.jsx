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
        className={`font-black text-lg tracking-widest duration-300 hover:text-red-700 py-12 border-main-red whitespace-nowrap ${
          isActive ? "text-red-600" : "text-white"
        }`}
      >
        {menuItem.name}
      </a>
    );
  } else {
    linkOrDropdown = (
      <a
        name={menuItem.name}
        className={`font-black cursor-default text-lg tracking-widest duration-300 hover:text-red-700 py-12 border-main-red whitespace-nowrap ${
          isActive ? "text-red-600" : "text-white"
        }`}
      >
        {menuItem.name}
      </a>
    );
  }
  return (
    <div
      className="relative"
      onMouseEnter={onShow}
      onMouseLeave={onShow}
      name={menuItem.name}
    >
      {linkOrDropdown}
      <div
        className={`overflow-hidden ${
          toggled
            ? "opacity-100 translate-y-0 z-50"
            : "opacity-0 translate-y-12 -z-50 max-h-0"
        } w-64 duration-700 ease-in-out -right-20 absolute bg-dark-blue text-white flex flex-col whitespace-nowrap top-[50px]`}
      >
        {menuItem.submenu.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className={`${
              item.link === pathname || item.link + "/" === pathname
                ? "bg-dark-blue "
                : ""
            } mx-5 px-3 py-2 text-sm font-semibold duration-200 hover:text-red-700 first:mt-8 last:mb-8 flex items-center justify-between`}
          >
            <p>{item.name}</p>
            <IoIosArrowForward className="" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavLink;
