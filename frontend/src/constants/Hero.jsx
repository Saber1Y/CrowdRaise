import React, { useEffect } from "react";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Adjust animation duration
      easing: "ease-in-out", // Choose an easing function
      once: true, // Only animate once while scrolling down
    });
  }, []);

  return (
    <section className="relative bg-[url('/hero.png')] bg-center bg-cover min-h-screen flex flex-col items-center justify-center text-white">
      <Navbar  />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center" data-aos="zoom-in">
        <h1 className="font-bold text-[40px] md:text-[65px] mb-4 font-sans">
          <span className="text-[#13ADB7]">Happiness</span> Comes <br /> from{" "}
          <span className="text-[#13ADB7]">your action</span>
        </h1>
        <p className="mb-8 text-[18px]">
          Be a part of the breakthrough and make someone’s dream come true.
        </p>

        <div className="flex justify-center items-center space-x-4">
          <button className="bg-[#13ADB7] px-10 py-3 text-[15px] md:text-[18px] text-white rounded-full">
            Donate now
          </button>
          <button className="px-10 py-3  text-[15px] md:text-[18px] text-white border border-white rounded-full">
            Watch now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
