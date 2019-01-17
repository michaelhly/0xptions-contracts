const HDWalletProvider = require("truffle-hdwallet-provider");
const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
);

const Web3 = require("web3");
const web3 = new Web3(provider);

const OptionsRegistry = require("../build/contracts/OptionsRegistry.json");
const OptionsRegistryAddress = OptionsRegistry.networks["4"].address;
const AugurContracts = require("augur-core-abi");
const AugurAddresses = AugurContracts.addresses["4"];

const BN = web3.utils.BN;
const BLOCKS_PER_DAY = (60 / 14) * 60 * 24;
const RINKEBY_WETH = "0xc778417e063141139fce010982780140aa0cd5ab";
const myAddress = process.env.WALLET;

const lookupAbi = (contract, method) => {
  const funcAbi = AugurContracts[contract].filter(function(element) {
    return element.name === method;
  });

  const { name, type, inputs } = funcAbi[0];
  return { name, type, inputs };
};

const main = async () => {
  const Universe = new web3.eth.Contract(
    AugurContracts["Universe"],
    AugurAddresses.Universe
  );

  const noShowBond = await Universe.methods
    .getOrCacheDesignatedReportNoShowBond()
    .call();
  const repAddress = await Universe.methods.getReputationToken().call();

  const REP = new web3.eth.Contract(
    AugurContracts["LegacyReputationToken"],
    repAddress
  );

  await REP.methods.faucet(0).send({ from: myAddress });
  await REP.methods
    .transfer(OptionsRegistryAddress, noShowBond)
    .send({ from: myAddress });

  const FactoryInstance = new web3.eth.Contract(
    OptionsRegistry.abi,
    OptionsRegistryAddress
  );

  const allowance = await REP.methods
    .allowance(OptionsRegistryAddress, AugurAddresses.Universe)
    .call();

  if (parseInt(allowance) === 0) {
    await FactoryInstance.methods
      .approveUniverse(AugurAddresses.Universe)
      .send({ from: myAddress });
  }
  console.log(allowance);

  const currentBlock = await web3.eth.getBlockNumber();

  const marketDescription =
    "ETH call option at $500 [expiring 1 year from market creation]";

  const marketInfo = {
    resolutionSource: "https://pro.coinbase.com/trade/ETH-USD",
    underlying: `${RINKEBY_WETH}`,
    longDescription:
      "YES share represents European call option on ETH with strike price $500. \
    Holder of NO share becomes option writer. \
    At the expiration holder of YES share receives the amount by which ETH exceeds price of $500. \
    Holder of NO share received $500 or 1 ETH, whichever is smaller. \
    === Instruction for reporters === \
    Let E be price of last trade on Coinbase Pro for pair ETH/USD in year 2018 (UTC). \
    Calculate V = (E - $500) / E. If V < 0, resolve market as 0. \
    Otherwise resolve market as V, rounded to the nearest market tick. \
    In the unlikely event that V falls exactly in the middle between two market ticks, round up."
  };

  const marketParams = {
    endTime: currentBlock * Math.round(360 * BLOCKS_PER_DAY),
    feePerEthInWei: web3.utils.toWei("0.01", "ether"),
    denominationToken: AugurAddresses.Cash,
    reporter: myAddress,
    minPrice: web3.utils.toWei("0", "ether"),
    maxPrice: web3.utils.toWei("1", "ether"),
    numTicks: web3.utils.toWei("10", "milliether"),
    topic: web3.utils.toHex("ETH call option"),
    description: marketDescription,
    extraInfo: JSON.stringify(marketInfo)
  };

  try {
    var createMarket = await FactoryInstance.methods
      .createOptionMarket(
        AugurAddresses.Universe,
        new BN(500).toString(),
        marketParams.endTime,
        marketParams.feePerEthInWei,
        marketParams.denominationToken,
        marketParams.reporter,
        marketParams.minPrice,
        marketParams.maxPrice,
        marketParams.numTicks,
        marketParams.topic,
        marketParams.description,
        marketParams.extraInfo
      )
      .send({
        from: myAddress,
        gasPrice: 12000000000,
        gas: 6000000,
        value: web3.utils.toWei("0.01", "ether")
      });
  } catch (err) {
    console.log(err);
  }

  console.log(createMarket);
};

module.exports = cb => {
  main()
    .then(res => cb(null, res))
    .catch(err => cb(err));
};
