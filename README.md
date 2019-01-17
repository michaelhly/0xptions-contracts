## Setup

Install packages using [yarn](https://yarnpkg.com/en/)

```bash
yarn
```

Compile contracts

```bash
yarn truffle compile
```

Set environment variables

```bash
MNEMONIC=...
INFURA_API_KEY=...
WALLET=...
```

Get OptionShares on Rinkeby (make sure you have at least 0.2 Ether in your wallet)

```bash
yarn truffle exec ./scripts/buy_complete_sets.js --network rinkeby
```

## Deployed Contracts

Network: Rinkeby

```
Running migration: 2_deploy_contracts.js
  Running step...
  Replacing OptionsRegistry...
  ... 0xee0d484cf892107e5f9852adcc44d3e2c20627669cd3040c99d50d1f1827f8c4
  OptionsRegistry: 0x71b628e812784fb5e8a69eb53e42c4588a8ac1e1
Saving artifacts...
Running migration: 3_deploy_veil_contracts.js
  Running step...
  Deploying VeilEther...
  ... 0x6b50466485db4e2bf82ece80aeeb00385f2deb07e2cd9d0304d6150593580660
  VeilEther: 0x93795593475e228fc65d7cd5eb5cf72bd255e705
  Deploying VirtualAugurShareFactory...
  ... 0xabbb3912dd935be4666f89ff16f36d89712ff3d64a94f18c128826e7c92195f4
  VirtualAugurShareFactory: 0xf2caf29ed92c2e9317fbe0e221a9c7817247bed1
  Deploying VeilCompleteSets...
  ... 0xfb02d92271e45b32b233b9de08fcd3bd33ed5427fb77cc505ce37fbff6f4a46a
  VeilCompleteSets: 0x1f615d9eacee6a326bcc95587395a878cfd848e4
Saving artifacts...
```
