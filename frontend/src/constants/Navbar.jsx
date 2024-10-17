import React from "react";
import LOGO from "../../public/LOGO.png";

const Navbar = () => {
  return (
    <section className="flex justify-around mt-4 ">
      <div className="flex space-x-2 items-center">
        <img src={LOGO} className="w-[25px] h-[25px]" />
        <span className="text-[20px] font-semi-bold leading-tight]">
          CrowdRaise
        </span>
      </div>
      <ul className="flex justify-center space-x-4 text-[18px] font-medium cursor-pointer">
        <li>Home</li>
        <li>Charity</li>
        <li>Disaster</li>
        <li>Event</li>
      </ul>
    </section>
  );
};

export default Navbar;
