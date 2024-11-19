import React from "react";
import LOGO from "../../public/LOGO.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-20 text-white">
      <div className="flex space-x-2 items-center">
        <img src={LOGO} className="w-[25px] h-[25px]" alt="Logo" />
        <span className="text-[20px] font-semi-bold leading-tight] text-black">
          CrowdRaise
        </span>
      </div>
      <ul className="flex justify-center space-x-5 text-[18px] font-medium cursor-pointer text-black">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isConnected && (
          <li>
            <Link to="/mycampaign">My Campaigns</Link>
          </li>
        )}
      </ul>
      <ConnectButton />
    </nav>
  );
};

export default Navbar;
