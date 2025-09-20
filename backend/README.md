## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

#### Base Mainnet Deployment

To deploy the CampaignFactory contract to Base Mainnet:

- Contract Address: `0xBdF554Bc92E6302c90Fe0Cb32f1C912539f01bac`
- Block Explorer: [basescan.org/address/0xbdf554bc92e6302c90fe0cb32f1c912539f01bac](https://basescan.org/address/0xbdf554bc92e6302c90fe0cb32f1c912539f01bac)
- Chain: Base Mainnet (Chain ID: 8453)
- Compiler: Solidity 0.8.30
- EVM Version: prague
- Status: Verified

Transactions and deployment artifacts are saved in `frontend/src/Data/BC/DeployCampaignFactory.s.sol/8453/run-latest.json`.

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

### Anvil substiture

Create Key: `Cast wallet import key name:defualtKey --interactive`
Deploy: forge script script/ --rpc-url --account saberKey --sender address:deployedat
