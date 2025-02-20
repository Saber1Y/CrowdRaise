import React, { useEffect } from "react";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "motion/react";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative bg-[url('/hero.png')] overflow-hidden bg-center bg-cover min-h-screen flex flex-col items-center justify-center text-white">
      <Navbar />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center my-10" data-aos="zoom-in">
        <h1
          className="font-bold text-[40px] md:text-[65px] mb-4 mt-10 font-sans"
          data-aso="fade-up"
        >
          <span className="text-[#13ADB7]">Happiness</span> Comes <br /> from{" "}
          <span className="text-[#13ADB7]">your action</span>
        </h1>
        <p className="mb-8 text-[20px] card p-4 font-sans font-semibold tracking-tight">
          Dreams are waiting to be fulfilled, and you have the power to make
          them a reality. Together, we can create a brighter tomorrow by
          supporting the innovators, dreamers.
          <br /> Every contribution counts, no matter how small, and your
          generosity can spark a revolution of hope. Join hands with us and
          leave your mark on someone’s journey.
          <br /> Crowdfund the future, one dream at a time.
        </p>

        <div className="flex justify-center items-center space-x-4">
          <motion.button
            className="px-10 py-3 text-[15px] md:text-[18px] text-white border border-[#13ADB7] rounded-full"
            onClick={() => {
              document
                .getElementById("projects")
                .scrollIntoView({ behavior: "smooth" });
            }}
            // Animation variants for hover and tap
            whileHover={{
              scale: 1.1,
              backgroundColor: "#ffffff",
              color: "#000000",
              transition: { duration: 0.3 },
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Donate now
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
