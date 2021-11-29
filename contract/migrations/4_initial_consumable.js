const Consumable = artifacts.require("Consumable");

module.exports = async function (deployer) {
  await deployer.deploy(Consumable, "HeNFT Consumable Token", "HeCNFT", "https://ipfs.infura.io:5001/api/v0/cat?arg=");
};
