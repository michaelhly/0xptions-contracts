const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);

const AugurContracts = require("augur-core-abi");
const AugurAddresses = AugurContracts.addresses["4"];
const IMarket = artifacts.require("IMarket");
const OptionsRegistry = artifacts.require("OptionsRegistry");
const VeilCompleteSets = artifacts.require("VeilCompleteSets");

const main = async () => {
  const veilCS = await VeilCompleteSets.at(
    "0x5fa2fe3ac5f6b0b2a06a0c1c46cb8b2823caa24a"
  );
  const optionsRegistry = await OptionsRegistry.at(
    "0xa41fa3857739509a295351ef6ad8b0cf16753e9e"
  );
  const markets = await optionsRegistry.getMarkets();
  for (let i = 0; i < markets.length; i++) {
    const marketInfo = await optionsRegistry.getMarket(markets[i]);
    const longToken = marketInfo[4];
    const shortToken = marketInfo[3];
    const market = await IMarket.at(markets[i]);
    const numTicks = await market.getNumTicks();
    const amount = web3.utils.toWei("2", "finney");
    await veilCS.buyCompleteSets(
      AugurAddresses.Augur,
      AugurAddresses.Cash,
      AugurAddresses.CompleteSets,
      markets[i],
      longToken,
      shortToken,
      amount,
      {
        from: process.env.WALLET,
        value: parseInt(amount) * parseInt(numTicks)
      }
    );
  }
  console.log("Purchase completed!");
};

module.exports = cb => {
  main()
    .then(res => cb(null, res))
    .catch(err => cb(err));
};
