import React, { useState } from "react";
import LOGO from "../../public/LOGO.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
// import { Link } from "react-router-dom";

const Navbar = () => {
  const { isConnected } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-20 bg-white text-black shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={LOGO}
          className="w-[25px] h-[25px] cursor-pointer"
          alt="Logo"
        />
        <span className="text-[20px] font-semibold leading-tight cursor-pointer">
          CrowdRaise
        </span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-center space-x-5 text-[18px] font-medium cursor-pointer">
        <li>
          <p to="/">Home</p>
        </li>
      </ul>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden flex items-center focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="sr-only">Toggle Menu</span>
        {isMenuOpen ? (
          <div className="space-y-1">
            <span className="block w-6 h-[2px] bg-black rotate-45 translate-y-1"></span>
            <span className="block w-6 h-[2px] bg-black -rotate-45 -translate-y-1"></span>
          </div>
        ) : (
          <div className="space-y-2">
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
          </div>
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-lg p-5 md:hidden">
          <ul className="flex flex-col items-center space-y-4 text-[18px] font-medium cursor-pointer">
            <li>
              <p onClick={() => setIsMenuOpen(false)}>
                Home
              </p>
            </li>
            <li>
              <ConnectButton />
            </li>
          </ul>
        </div>
      )}

      <div className="hidden md:block">
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
