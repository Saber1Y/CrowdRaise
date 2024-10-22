import React from "react";
import Group from "../../public/Group.jpg";

const GroupImg = () => {
  return (
    <div className="flex justify-center items-center my-5">
      <img src={Group} className="cursor-pointer" />
    </div>
  );
};

export default GroupImg;
