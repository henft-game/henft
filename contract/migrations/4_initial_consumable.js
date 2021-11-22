const Consumable = artifacts.require("Consumable");

module.exports = async function (deployer) {
  await deployer.deploy(Consumable, "GameToken NFT Consumable", "GTNFTC", "https://ipfs.infura.io:5001/api/v0/cat?arg=");
};
