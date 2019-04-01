const SampleToken1 = artifacts.require("SampleToken1");
const SampleToken2 = artifacts.require("SampleToken2");
const ERC20Proxy = "0x1dc4c1cefef38a777b15aa20260a54e584b16c48";

module.exports = function(deployer, network) {
  if (network === "development") {
    deployer.then(async () => {
      await deployer.deploy(SampleToken1, "Sample Token 1", "ST1", ERC20Proxy);
      await deployer.deploy(SampleToken2, "Sample Token 2", "ST2", ERC20Proxy);
    });
  }
};
