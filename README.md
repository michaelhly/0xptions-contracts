#Setup

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

#Deployed Contracts
Network: Rinkeby

```
Running migration: 2_deploy_contracts.js
  Running step...
  Deploying OptionsRegistry...
  ... 0xd868b76363b1a99e1ddb9a6cfe16b74d5f13ddb94e5cdc729d5c62a855aba5bf
  OptionsRegistry: 0xa6dc5ae4eda54f751256466cf39d0a1751c0ec40
Saving artifacts...
Running migration: 3_deploy_veil_contracts.js
  Running step...
  Deploying VeilEther...
  ... 0x7030868f6261f0125a0e1dd5f81a3a660fc0a72fe8595258cbffa0de6061441c
  VeilEther: 0xc6a54cd11f6527c514539c1b3087636a21bf3bf5
  Deploying VirtualAugurShareFactory...
  ... 0x6e320fea68f9fb7866bdac79361a34e3f931432f27326d54f9327ca94b6da451
  VirtualAugurShareFactory: 0x30b525d9d0e9225160f9e3119e186b05e66e8b02
  Deploying VeilCompleteSets...
  ... 0xcbc534b1aaf1bcb26475174001f9ec93269aee379910e9c9985859c630afc3a7
  VeilCompleteSets: 0x7caa8df93d6a6e45cff336d8f98c6b9f4893a901
Saving artifacts...
```
