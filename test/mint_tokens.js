const SampleToken = artifacts.require("SampleToken");

contract("Mint Sample Tokens", accounts => {
  let sampleToken = null;
  before(async () => {
    sampleToken = await SampleToken.deployed();
  });

  it("Distribute 1 million tokens to all accounts", async () => {
    for (let i = 0; i < accounts.length; i++) {
      await sampleToken
        .mint(accounts[i], "1000000000000000000000000")
        .then(async () => {
          const balance = await sampleToken.balanceOf(accounts[i]);
          console.log(
            `Account: ${accounts[i]}, Balance: ${balance / 1000000000000000000}`
          );
        });
    }
  });
});
