import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "../src/constants/config";

import factoryContract from "../src/Data/ABI/CampaignFactory.sol/CampaignFactory.json";
import factoryContractDeployed from "../src/Data/BC/DeployCampaignFactory.s.sol/31337/run-latest.json";

import Hero from "./constants/Hero";
import CreateCampignForm from "./constants/CreateCampignForm";
import Distribute from "./constants/Distribute";
import Footer from "./constants/Footer";
import GroupImg from "./constants/GroupImg";
import Navbar from "./constants/Navbar"; // Import Navbar

const queryClient = new QueryClient();

function App() {
  const contractAddress = "0xf6920D45d16c5FAa9eB40753Bb3F16D353355705";
  const abi = factoryContract.abi;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Navbar />
          <Hero />
          <CreateCampignForm contractAddress={contractAddress} abi={abi} />
          <Distribute />
          <GroupImg />
          <Footer />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
