const VeilEther = artifacts.require("veil-contracts/VeilEther");
const VirtualAugurShareFactory = artifacts.require(
  "veil-contracts/VirtualAugurShareFactory"
);
const VeilCompleteSets = artifacts.require("veil-contracts/VeilCompleteSets");

module.exports = function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(VeilEther);
    await deployer.deploy(VirtualAugurShareFactory);
    await deployer.deploy(VeilCompleteSets);
  });
};
