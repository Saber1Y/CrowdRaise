import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "../src/constants/config";

import crowdContract from "../src/Data/CrowdFunding.json";

import Hero from "./constants/Hero";
import CardList from "./constants/CardList";
import CreateCampignForm from "./constants/CreateCampignForm";
import Distribute from "./constants/Distribute";
import Donations from "./constants/Donations";
import Footer from "./constants/Footer";
import GroupImg from "./constants/GroupImg";

const queryClient = new QueryClient();

function App() {
  const contractAddress = "0x90193C961A926261B756D1E5bb255e67ff9498A1";
  const abi = crowdContract.abi;
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Hero />
          {/* <CreateCampignForm contractAddress={contractAddress} abi={abi} /> */}
          <Donations />
          <CardList />
          <Distribute />
          <GroupImg />
          <Footer />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
