Network: Rinkeby

```
Migrations dry-run (simulation)
===============================
> Network name:    'rinkeby-fork'
> Network id:      4
> Block gas limit: 7000595


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > account:             0xC4D7598B59B400c3245693003c5d047f1ac430dc
   > balance:             18.611225164
   > gas used:            209195
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.00041839 ETH

   -------------------------------------
   > Total cost:          0.00041839 ETH


2_deploy_optionFactory.js
=========================

   Deploying 'OptionFactory'
   -------------------------
   > account:             0xC4D7598B59B400c3245693003c5d047f1ac430dc
   > balance:             18.610187108
   > gas used:            492120
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.00098424 ETH

   -------------------------------------
   > Total cost:          0.00098424 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.00140263 ETH

⚠️  Important ⚠️
If you're using an HDWalletProvider, it must be Web3 1.0 enabled or your migration will hang.


Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 7000595


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xb1f58fab4b15e5da73835b7e9d11c4cd3ae0d3e81e25adcefd022e3e22f7902f
   > Blocks: 1            Seconds: 16
   > contract address:    0xfB345F61105836f246259bdEd1831Ee94890858F
   > account:             0xC4D7598B59B400c3245693003c5d047f1ac430dc
   > balance:             18.607159654
   > gas used:            224195
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0044839 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0044839 ETH


2_deploy_optionFactory.js
=========================

   Deploying 'OptionFactory'
   -------------------------
   > transaction hash:    0x366f3f0185b3b72a00880736f18047343c2b6526b4513dbea8cae9c74821076e
   > Blocks: 0            Seconds: 12
   > contract address:    0x3Eb69A584B329752Aa72ad3712c761FcEffe1b38
   > account:             0xC4D7598B59B400c3245693003c5d047f1ac430dc
   > balance:             18.596479094
   > gas used:            492120
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0098424 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0098424 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.0143263 ETH
```
