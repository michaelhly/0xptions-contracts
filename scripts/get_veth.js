const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);

const VeilEther = artifacts.require("VeilEther");

const ZrxERC20Proxy = {
  mainnet: {
    address: "0x2240dab907db71e64d3e0dba4800c83b5c502d4e"
  },
  rinkeby: {
    address: "0x2f5ae4f6106e89b4147651688a92256885c5f410"
  },
  kovan: {
    address: "0xf1ec01d6236d3cd881a0bf0130ea25fe4234003e"
  },
  development: {
    address: "0x0000000000000000000000000000000000000000"
  }
};

const main = async () => {
  console.log(network);
  const veth = await VeilEther.at("0x9c610ad5e7aedc4cb56523277d1122e6110aa958");
  const max = 2 ** 53 - 1;
  await veth.depositAndApprove(ZrxERC20Proxy.rinkeby.address, max.toString(), {
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
  main(network)
    .then(res => {
      cb(null, res);
    })
    .catch(err => cb(err));
};