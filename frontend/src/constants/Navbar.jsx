import React from "react";
import LOGO from "../../public/LOGO.png";

const Navbar = () => {
  return (
    <section className="flex">
      <div className="flex space-x-2 items-center">
        <img src={LOGO} className="w-[25px] h-[25px]" />
        <span className="text-[18px] font-semi-bold leading-tight]">
          CrowdRaise
        </span>
      </div>

      <div>
        <ul>
          <li>Home</li>
          <li>Charity</li>
          <li>Disaster</li>
          <li>Event</li>
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
