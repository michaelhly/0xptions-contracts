const OptionsRegistry = artifacts.require("OptionsRegistry");
const VirtualAugurShareFactory = artifacts.require("VirtualAugurShareFactory");

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

const VeilShareFactory = {
  mainnet: {
    address: "0x0000000000000000000000000000000000000000"
  },
  kovan: {
    address: "0x0000000000000000000000000000000000000000"
  }
};

module.exports = function(deployer, network) {
  const ERC20Proxy = ZrxERC20Proxy[network].address;
  if (network === "mainnet" || network === "kovan") {
    deployer.deploy(
      OptionsRegistry,
      VeilShareFactory[network].address,
      ERC20Proxy
    );
  } else {
    return deployer.deploy(VirtualAugurShareFactory).then(async () => {
      await deployer.deploy(
        OptionsRegistry,
        VirtualAugurShareFactory.address,
        ERC20Proxy
      );
    });
  }
};
