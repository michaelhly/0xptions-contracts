const SampleToken = artifacts.require("SampleToken");
const VeilEther = artifacts.require("VeilEther");

const ERC20Proxy = "0x1dc4c1cefef38a777b15aa20260a54e584b16c48";

contract("Mint Sample Tokens", accounts => {
  let sampleToken = null;
  let veilEther = null;
  before(async () => {
    sampleToken = await SampleToken.deployed();
    veilEther = await VeilEther.deployed();
  });

  it("Wrap 1 ETH for all accounts", async () => {
    console.log("---------- VETH Balances----------");
    for (let i = 0; i < accounts.length; i++) {
      await veilEther
        .depositAndApprove(ERC20Proxy, "1000000000000000000000000", {
          from: accounts[i],
          value: "1000000000000000000"
        })
        .then(async () => {
          const balance = await veilEther.balanceOf(accounts[i]);
          console.log(
            `Account: ${accounts[i]}, Balance: ${balance / 1000000000000000000}`
          );
        });
    }
  });

  it("Distribute 1 million sample tokens to all accounts", async () => {
    console.log("---------- Sample Token Balances----------");
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
