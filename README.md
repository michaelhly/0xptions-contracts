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
  ... 0x895519adbf87d26eda9757d38efe9b8e1d47f3201c2b95e1ae740ecbed63099a
  VirtualAugurShareFactory: 0xbe21029b50220f221a9aa138cfa84c361673d9ad
  Deploying OptionsRegistry...
  ... 0x258aa5bec988c9d77c923d600535aaca3f52ed37461c94aae08c58df69f68fe7
  OptionsRegistry: 0xa41fa3857739509a295351ef6ad8b0cf16753e9e
Saving artifacts...
Running migration: 3_deploy_veil_contracts.js
  Running step...
  Deploying VeilEther...
  ... 0x4251a1aa7dc2d31c8c7b95a7d12298fe3f8cec616ddfca333331aa80a78a9ec7
  VeilEther: 0x9c610ad5e7aedc4cb56523277d1122e6110aa958
  Deploying VeilCompleteSets...
  ... 0x9b8e8084cffb87a711bb64748f89ebf225c537c7ea5dbb168bd7b766b09ee50f
  VeilCompleteSets: 0x5fa2fe3ac5f6b0b2a06a0c1c46cb8b2823caa24a
Saving artifacts...
```
