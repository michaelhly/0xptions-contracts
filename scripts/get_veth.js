const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);
const BN = web3.utils.BN;
const VeilEther = artifacts.require("VeilEther");
const ZrxERC20Proxy = "0x3e809c563c15a295e832e37053798ddc8d6c8dab";

const main = async () => {
  const veth = await VeilEther.deployed();
  await veth.depositAndApprove(ZrxERC20Proxy, 2 ** 256 - 1, {
    from: process.env.WALLET,
    value: web3.utils.toWei("100", "milliether")
  });
  const balance = await veth.balanceOf(process.env.WALLET);

  console.log(`0.1 Veil Ether was sent to ${process.env.WALLET}`);
  console.log(
    `You now have ${web3.utils.fromWei(balance.toString())} Veil Ether`
  );
};

module.exports = cb => {
  main()
    .then(res => {
      cb(null, res);
    })
    .catch(err => cb(err));
};
