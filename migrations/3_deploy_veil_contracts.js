const VeilEther = artifacts.require("VeilEther");
const VeilCompleteSets = artifacts.require("VeilCompleteSets");

module.exports = function(deployer, network) {
  if (network !== "kovan" || network !== "mainnet") {
    deployer.then(async () => {
      await deployer.deploy(VeilEther);
      await deployer.deploy(VeilCompleteSets);
    });
  }
};
