const IMarket = artifacts.require("IMarket");
const OptionsRegistry = artifacts.require("OptionsRegistry");
const VirtualAugurShareFactory = artifacts.require("VirtualAugurShareFactory");
const ZrxERC20Proxy = "0x3e809c563c15a295e832e37053798ddc8d6c8dab";

const fs = require("fs");
const stringifyObject = require("stringify-object");

const main = async () => {
  const shareTokens = [];
  const optionsRegistry = await OptionsRegistry.deployed();
  const shareFactory = await VirtualAugurShareFactory.deployed();
  const markets = await optionsRegistry.getMarkets();

  for (let i = 0; i < markets.length; i++) {
    const mktAddr = markets[i];
    const market = await IMarket.at(mktAddr);
    const numOutcomes = await market.getNumberOfOutcomes();
    const tokens = [];
    for (let j = 0; j < parseInt(numOutcomes); j++) {
      try {
        const wrapShareToken = await shareFactory.create(
          await market.getShareToken(j),
          ZrxERC20Proxy
        );
        const virtualShareToken = {
          name: "Virtual Augur Share",
          decimals: 18,
          symbol: "VShare",
          address: wrapShareToken.logs[0].args.virtualToken
        };
        tokens.push(virtualShareToken);
      } catch (err) {
        console.log(err);
      }
    }
    shareTokens.push({
      market: mktAddr,
      tokens: tokens
    });
  }

  return shareTokens;
};

module.exports = cb => {
  main()
    .then(res => {
      console.log(res);
      fs.writeFile(
        "./scripts/shareTokens.json",
        stringifyObject(res, { indent: " ", singleQuotes: false }),
        err => {
          if (err) console.err(err);
          else console.log("Complete");
        }
      );
      cb(null, res);
    })
    .catch(err => cb(err));
};
