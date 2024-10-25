import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "../src/constants/config";

import Hero from "./constants/Hero";
import CardList from "./constants/CardList";
import Distribute from "./constants/Distribute";
import Donations from "./constants/Donations";
import Footer from "./constants/Footer";
import GroupImg from "./constants/GroupImg";

// Initialize QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    // Wrap everything with QueryClientProvider
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Hero />
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
