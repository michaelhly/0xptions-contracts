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
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x6aba48830f5463d94ed372134fc032c24544f55da50a7540060f388db390ce6f
  Migrations: 0xd21e42ee32524051e7b0c3a88ddb8c541b525f61
Saving successful migration to network...
  ... 0x6645cf785ea74552c53d10f9e53e2d8992b9ed134a505d1e6efffe60aa93086d
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Running step...
  Deploying OptionsRegistry...
  ... 0x6a6817aa64b4d6c4a8358dfc26bc27c0b9a1090dceba8238c368131724b25e41
  OptionsRegistry: 0x898d319dc8aa9bbcf116ffa4356d2e284383d25a
Saving successful migration to network...
  ... 0x1a28ae944082b39a7591bf67ed879331c7389efcddb50ce6e1a2b59e75b15dda
Saving artifacts...
Running migration: 3_deploy_veil_contracts.js
  Running step...
  Deploying VeilEther...
  ... 0x7bfa340a89490451d152588ac74e9e9f06118732adaa0d186f22db496ec33247
  VeilEther: 0x98fb3afa6853434d75fcac8f8890b14f9af2a390
  Deploying VirtualAugurShareFactory...
  ... 0xac7d025a7ca55c03cd55d782634372e59c03c55b388f50df92c5c2b0d13d1de4
  VirtualAugurShareFactory: 0xbd9aa708eb3e01966b70a2973c23423768c50e97
  Deploying VeilCompleteSets...
  ... 0x28c18dcfe139a76fe68d8a3624e4cbe442c552e0e7a7c2e7581d43be0d892527
  VeilCompleteSets: 0x97c9666d161d20c92442f177d3d6ac381ea77756
Saving successful migration to network...
  ... 0x4a40ca1702c05720d5d929b59015bcd350a05ddd4f20d55a5eddb35255a57078
Saving artifacts...
```
