const OptionFactory = artifacts.require("OptionFactory");

module.exports = function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(OptionFactory);
  });
};
