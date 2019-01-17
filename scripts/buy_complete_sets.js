const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);

const AugurContracts = require("augur-core-abi");
const AugurAddresses = AugurContracts.addresses["4"];
const VeilCompleteSets = artifacts.require("VeilCompleteSets");
const IMarket = artifacts.require("IMarket");
const ShareTokens = require("../tokens/shareTokens.json");

const main = async () => {
  const veilCS = await VeilCompleteSets.at(
    "0x1f615d9eacee6a326bcc95587395a878cfd848e4"
  );
  for (let i = 0; i < ShareTokens.length; i++) {
    const marketAddress = ShareTokens[i].market;
    const market = await IMarket.at(marketAddress);
    const numTicks = await market.getNumTicks();
    const amount = web3.utils.toWei("2", "finney");
    await veilCS.buyCompleteSets(
      AugurAddresses.Augur,
      AugurAddresses.Cash,
      AugurAddresses.CompleteSets,
      marketAddress,
      ShareTokens[i].tokens[1].address,
      ShareTokens[i].tokens[0].address,
      amount,
      {
        from: process.env.WALLET,
        value: parseInt(amount) * parseInt(numTicks)
      }
    );
  }
};

module.exports = cb => {
  main()
    .then(res => cb(null, res))
    .catch(err => cb(err));
};
