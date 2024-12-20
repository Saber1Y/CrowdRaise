import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const contractAddress =
    factoryContractDeployed.transactions[0].contractAddress;
  const abi = factoryContract.abi;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <CreateCampignForm
                      contractAddress={contractAddress}
                      abi={abi}
                    />
                    <Distribute />
                    <GroupImg />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/mycampaign"
                element={
                  <div className="flex flex-col">
                    <Distribute />
                    <GroupImg />
                    <Footer />
                  </div>
                }
              />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
