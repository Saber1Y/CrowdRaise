import React from "react";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <section className="relative bg-[url('/hero.png')] bg-center bg-cover min-h-screen flex flex-col justify-center items-center text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="font-bold text-[60px] mb-4">
          <span className="text-[#13ADB7]">Happiness</span> Comes <br /> from{" "}
          <span className="text-[#13ADB7]">your action</span>
        </h1>
        <p className="mb-8 text-[16px]">
          Be a part of the breakthrough and make someone’s dream come true.
        </p>
        {/* Centering buttons */}
        <div className="flex justify-center items-center space-x-4">
          <button className="bg-blue-500 px-4 py-2 text-white rounded">
            Hellooooo
          </button>
          <button className="bg-blue-500 px-4 py-2 text-white rounded">
            Hiiii
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
