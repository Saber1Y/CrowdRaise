import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const localhost = defineChain({
  id: 31337,
  name: "Avil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
});

export const config = getDefaultConfig({
  // export const config = createConfig({
  appName: "CrowdRaise",
  projectId: "crowdraise",
  appDescription: "crowdraise Project",
  chains: [mainnet, sepolia, localhost],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/7IAoRyvjCG_IAfzvFbymhZxXRABpcvuV"),
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
});