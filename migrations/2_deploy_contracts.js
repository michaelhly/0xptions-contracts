const OptionFactory = artifacts.require("OptionFactory");

module.exports = function(deployer, network) {
  deployer.then(async () => {
    await deployer.deploy(OptionFactory);
  });
};
