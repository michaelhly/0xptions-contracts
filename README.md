Install packages using [yarn](https://yarnpkg.com/en/)

```bash
yarn
```

Compile contracts

```bash
yarn truffle compile
```

Get OptionShares on Rinkeby (make sure you have at least 0.2 Ether in your wallet)

```bash
yarn truffle exec ./scripts/buy_complete_sets.js --network rinkeby
```

**Deployed Contracts**
<br />
Network: Rinkeby 

```
Running migration: 2_deploy_contracts.js
  Running step...
  Deploying OptionFactory...
  ... 0x94e7819ea0231af0fb62b073216061c05e1671555dde4e5d81387be62b4a7eb1
  OptionFactory: 0x03aadf6fc0e2577a7889bcb306ec99f2f0a9861f
Saving artifacts...
Running migration: 3_deploy_veil_contracts.js
  Running step...
  Deploying VeilEther...
  ... 0xba728429b530d1313891277867a7d97ccf24f033173ef4808aee459bde622439
  VeilEther: 0x0734920053cf4b68167e224f40fe733adb0039e3
  Deploying VirtualAugurShareFactory...
  ... 0xed8731692f1e3227c953cb94a796b6f6acc32dc0945e5601d52e87dfb342f966
  VirtualAugurShareFactory: 0x4a62eabc214715b13e4f0bfb5a06384627781e74
  Deploying VeilCompleteSets...
  ... 0xd138ac02556f341e0c22f81102d6b88e465459c186fa7ab89bec7eecb17add03
  VeilCompleteSets: 0x11ab9ed823ed54d7780725af4c25a392e7450c8e
Saving artifacts...
```
