# Crowdfunding DApp

A decentralized crowdfunding platform built using **Next.js**, **Wagmi**, **Tailwind CSS**, **React**, and **Solidity**. This project empowers individuals to create campaigns and receive contributions securely through smart contracts on the Ethereum blockchain.

## Features
- **Create Campaigns**: Users can define goals, durations, and descriptions for their campaigns.
- **Contribute to Campaigns**: Supporters can securely contribute funds to their chosen campaigns.
- **Persistent Data**: Campaign data is saved locally to `localStorage` to ensure persistence across page reloads.
- **Real-Time Progress**: Displays campaign progress in real-time using the blockchain.

## Technologies Used
- **Frontend**: React, Next.js, Tailwind CSS, Wagmi
- **Backend**: Solidity Smart Contracts
- **Blockchain**: Ethereum Virtual Machine (EVM)
- **State Management**: React hooks
- **Notifications**: `react-toastify` for user-friendly alerts
- **Private Key Management: Foundry's cast for secure private key storage and transaction signing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Metamask installed in your browser
- Access to an Ethereum testnet (e.g., Goerli)
- Foundry (for Solidity smart contract development)
- Wagmi & Viem (for connection to backend)
- Storage of Images (Pinanta & IPFS)

### Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/crowdfunding-dapp.git
   cd crowdfunding-dapp
   
3. Install Dependencies:
   ```bash
   npm install  # or yarn install

4. Start Development Server:
   ```bash
   npm run dev  # or yarn dev

### Smart Contract Deployment Using Foundry

1. install Foundry (If not already installed):
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup

2. Compile the Contract: 
   ```bash
   forge build

3. Run test:
   ```bash
   forge test

4. Deploy to a testnet (e.g., Sepolia or Goerli):
   
  ```bash
  forge script script/DeploySimpleStorage.s.sol --rpc-url $RPC_URL --broadcast --private-key $PRIVATE_KEY
  forge script script/DeploySimpleStorage.s.sol --rpc-url http://127.0.0.1:8545 --broadcast --account nameOfAccountGoesHere --sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266

