const SampleToken1 = artifacts.require("SampleToken1");
const SampleToken2 = artifacts.require("SampleToken2");
const VeilEther = artifacts.require("VeilEther");

const ERC20Proxy = "0x1dc4c1cefef38a777b15aa20260a54e584b16c48";

contract("Mint Sample Tokens", accounts => {
  let sampleToken1 = null;
  let sampleToken2 = null;
  let veilEther = null;
  before(async () => {
    sampleToken1 = await SampleToken1.deployed();
    sampleToken2 = await SampleToken2.deployed();
    veilEther = await VeilEther.deployed();
  });

  it("Wrap 1 ETH for all accounts", async () => {
    console.log("---------- VETH Balances----------");
    for (let i = 0; i < accounts.length; i++) {
      await veilEther
        .depositAndApprove(ERC20Proxy, "1000000000000000000000000", {
          from: accounts[i],
          value: "10000000000000000000"
        })
        .then(async () => {
          const balance = await veilEther.balanceOf(accounts[i]);
          console.log(
            `Account: ${accounts[i]}, Balance: ${balance / 1000000000000000000}`
          );
        });
    }
  });

  it("Distribute 1 million sample token 1 to all accounts", async () => {
    console.log("---------- Sample Token 1 Balances----------");
    for (let i = 0; i < accounts.length; i++) {
      await sampleToken1
        .mint(accounts[i], "1000000000000000000000000")
        .then(async () => {
          const balance = await sampleToken1.balanceOf(accounts[i]);
          console.log(
            `Account: ${accounts[i]}, Balance: ${balance / 1000000000000000000}`
          );
        });
    }
  });

  it("Distribute 1 million sample token 2 to all accounts", async () => {
    console.log("---------- Sample Token 2 Balances----------");
    for (let i = 0; i < accounts.length; i++) {
      await sampleToken2
        .mint(accounts[i], "1000000000000000000000000")
        .then(async () => {
          const balance = await sampleToken2.balanceOf(accounts[i]);
          console.log(
            `Account: ${accounts[i]}, Balance: ${balance / 1000000000000000000}`
          );
        });
    }
  });
});
