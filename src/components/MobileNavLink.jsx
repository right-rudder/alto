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
        className={`w-full flex items-center justify-between py-3 whitespace-nowrap ${
          isActive ? "text-mustard-yellow" : "text-white"
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
        className={`w-full flex items-center justify-between py-3 whitespace-nowrap ${
          isActive ? "text-mustard-yellow" : "text-white"
        }`}
      >
        <p className="pointer-events-none">{menuItem.name}</p>
        <div
          className={` p-1 pointer-events-none duration-300 ${
            toggled ? "bg-white rotate-90" : "bg-mustard-yellow"
          }`}
        >
          <IoIosArrowForward
            className={`${toggled ? "text-mustard-yellow" : "text-white"} size-5`}
          />
        </div>
      </button>
    );
  }

  return (
    <div className="flex flex-col items-start border-t border-white/30 last:border-b">
      {buttonOrAnchor}
      <ul
        className={`overflow-hidden text-white ${
          toggled ? "max-h-[30rem]" : "max-h-0"
        } transition-[max-height] duration-300 ease-in-out w-full pl-3 }`}
      >
        {menuItem.submenu.map((item) => (
          <li
            key={item.name}
            className="border-t border-white/20 last:border-b"
          >
            <a
              href={item.link}
              className={`block w-full py-3  ${
                item.link === pathname || item.link + "/" === pathname
                  ? "text-mustard-yellow"
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
