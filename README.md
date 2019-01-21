## Setup

Install packages using [yarn](https://yarnpkg.com/en/)

```bash
yarn
```

Comple contracts

```bash
yarn truffle compile
```

Set environment variables

```bash
MNEMONIC=...
INFURA_API_KEY=...
WALLET=...
```

Get VeilEther on Rinkeby (make sure you have at least 0.1 Ether in your wallet)

```bash
yarn truffle exec ./scripts/get_veth.js --network rinkeby
```

Get OptionShares on Rinkeby (make sure you have at least 0.2 Ether in your wallet)

```bash
yarn truffle exec ./scripts/buy_complete_sets.js --network rinkeby
```

## Deployed Contracts

Network: Rinkeby

```
Running migration: 2_deploy_contracts.js
  Deploying VirtualAugurShareFactory...
  ... 0x89de5858b5adaecf11d41b5e38ad3d9d7f0134e73bf542f0142f04e3193e682f
  VirtualAugurShareFactory: 0x27eb89ec9726c97c9bb2f0c6a205de39de2bd5c0
  Deploying OptionsRegistry...
  ... 0xf68bc7253cb589d20abfc6763abf5902efa1c5a3d4ce9277737d25decdea3fcd
  OptionsRegistry: 0xa5b14070af70f56fc0b3216045e53d3224bb0172
Saving artifacts...
Running migration: 3_deploy_veil_contracts.js
  Running step...
  Deploying VeilEther...
  ... 0xe38d20f9069f75baa02848b946b65c2f4ce4e49ad639c6c9d38a2724d7324996
  VeilEther: 0xc4abc01578139e2105d9c9eba0b0aa6f6a60d082
  Deploying VeilCompleteSets...
  ... 0xb840527e802a8455c692587ee0b3a20db9eaa3be3e3643e5036be23dcfea4b89
  VeilCompleteSets: 0x26ee4b7de3b6be1fab4280cb35f3f4067a32a625
Saving artifacts...
```
