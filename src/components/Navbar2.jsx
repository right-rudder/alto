import React, { useState } from "react";

import { navbarLinks } from "../data/navbarLinks";

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [subHoveredIndex, setSubHoveredIndex] = useState(null);
  console.log(hoveredIndex, subHoveredIndex);
  return (
    <nav className="relative">
      <ul className="flex">
        {navbarLinks.map((item, index) => (
          <li
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a href={item.link || "#"}>{item.name}</a>
            {item.submenu && item.submenu.length > 0 && (
              <ul
                className={`absolute top-full left-0 duration-1000 ${hoveredIndex === index ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"}`}
              >
                {item.submenu.map((subitem, subIndex) => (
                  <li
                    key={subIndex}
                    className="relative hover:bg-red-600"
                    onMouseEnter={() => setSubHoveredIndex(subIndex)}
                    onMouseLeave={() => setSubHoveredIndex(null)}
                  >
                    <a href={subitem.link || "#"}>{subitem.name}</a>
                    {subitem.subsubmenu && subitem.subsubmenu.length > 0 && (
                      <ul
                        className={`absolute top-0 left-full duration-500 ${subHoveredIndex === subIndex ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"}`}
                      >
                        {subitem.subsubmenu.map((subsubitem, subsubIndex) => (
                          <li
                            key={subsubIndex}
                            className="relative hover:bg-red-600"
                          >
                            <a href={subsubitem.link}>{subsubitem.name}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
