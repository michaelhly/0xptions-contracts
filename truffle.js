require("dotenv").config();
require("babel-register");
require("babel-polyfill");

const HDWalletProvider = require("truffle-hdwallet-provider");

const infura = network => () => {
  return new HDWalletProvider(
    process.env.MNEMONIC,
    `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
  );
};

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    mainnet: {
      provider: infura("mainnet"),
      gas: 8000000,
      network_id: 1
    },
    kovan: {
      provider: infura("kovan"),
      gas: 6500000,
      network_id: 42
    },
    rinkeby: {
      provider: infura("rinkeby"),
      gas: 6500000,
      network_id: 4
    }
  }
};
