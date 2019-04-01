const SampleToken = artifacts.require("SampleToken");
const ERC20Proxy = "0x1dc4c1cefef38a777b15aa20260a54e584b16c48";

module.exports = function(deployer, network, accounts) {
  if (network === "development") {
    deployer.then(async () => {
      sampleToken = await deployer.deploy(
        SampleToken,
        "Sample Token",
        "ST",
        ERC20Proxy
      );
    });
  }
};
