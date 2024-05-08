import { IoIosArrowForward } from "react-icons/io";

const MobileNavLink = ({ menuItem, pathname, toggled, onShow }) => {
  const isActive =
    menuItem.submenu.some(
      (item) => item.link === pathname || item.link + "/" === pathname,
    ) ||
    menuItem.link === pathname ||
    menuItem.link + "/" === pathname;

  let buttonOrAnchor;
  if (menuItem.submenu.length === 0) {
    buttonOrAnchor = (
      <a
        id={menuItem.name}
        href={menuItem.link}
        className={`w-full flex items-center font-bold justify-between py-3 whitespace-nowrap ${
          isActive ? "text-red-700" : "text-white"
        }`}
      >
        <p className="pointer-events-none">{menuItem.name}</p>
      </a>
    );
  } else {
    buttonOrAnchor = (
      <button
        id={menuItem.name}
        onClick={onShow}
        className={`w-full flex items-center font-bold justify-between py-3 whitespace-nowrap ${
          isActive ? "text-red-700" : "text-white"
        }`}
      >
        <p className="pointer-events-none">{menuItem.name}</p>
        <div
          className={`p-1 pointer-events-none duration-300 rounded-full ${
            toggled ? "bg-white rotate-90" : "bg-red-700 -rotate-90"
          }`}
        >
          <IoIosArrowForward
            className={`${toggled ? "text-red-700" : "text-white"} size-5`}
          />
        </div>
      </button>
    );
  }

  return (
    <div className="flex flex-col max-w-md mx-auto w-full border-t border-white/20 last:border-b">
      {buttonOrAnchor}
      <ul
        className={`overflow-hidden text-white ${
          toggled ? "max-h-[30rem]" : "max-h-0"
        } transition-[max-height] duration-300 ease-in-out pl-3 }`}
      >
        {menuItem.submenu.map((item) => (
          <li
            key={item.name}
            className="border-t border-white/20 last:border-b"
          >
            <a
              href={item.link}
              className={`block py-3 font-bold ${
                item.link === pathname || item.link + "/" === pathname
                  ? "text-red-700"
                  : ""
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNavLink;
