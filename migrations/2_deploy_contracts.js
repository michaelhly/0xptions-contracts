const OptionsRegistry = artifacts.require("OptionsRegistry");

module.exports = function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(OptionsRegistry);
  });
};
