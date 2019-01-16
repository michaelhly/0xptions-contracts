const HDWalletProvider = require("truffle-hdwallet-provider");
const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
);

const Web3 = require("web3");
const web3 = new Web3(provider);

const OptionsRegistry = artifacts.require("OptionsRegistry");
const VirtualAugurShareFactory = artifacts.require(
  "veil-contracts/VirtualAugurShareFactory"
);
const IMarket = artifacts.require("IMarket");
const AugurContracts = require("augur-core-abi");
console.log(VirtualAugurShareFactory);

const main = async () => {
  const shareFactory = await VirtualAugurShareFactory.deployed();
  const OptionsRegistry = await OptionsRegistry.deployed();

  const markets = await OptionsRegistry.allMarkets();
  console.log(markets);
  for (let i = 0; i < markets.length; i++) {
    console.log(markets[i]);
    //await shareFactory.
  }
};

module.exports = cb => {
  main()
    .then(res => cb(null, res))
    .catch(err => cb(err));
};
