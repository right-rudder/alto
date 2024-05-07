import { navbarLinks } from "../data/navbarLinks.js";
import MobileNavLink from "./MobileNavLink.jsx";
import { useState } from "react";

const MobileNavBar = ({ pathname }) => {
  const [open, setOpen] = useState("");
  const handleClick = (e) => {
    if (open === e.target.id) {
      setOpen("");
    } else {
      setOpen(e.target.id);
    }
  };

  return (
    <>
      {navbarLinks.map((item) => (
        <MobileNavLink
          key={item.name}
          menuItem={item}
          pathname={pathname}
          toggled={item.name === open}
          onShow={handleClick}
        />
      ))}
    </>
  );
};

export default MobileNavBar;
