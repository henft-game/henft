const GameToken = artifacts.require("GameToken");

module.exports = async function (deployer) {
  deployer.deploy(GameToken, "GameToken NFT", "GTNFT", "https://ipfs.infura.io:5001/api/v0/cat?arg=");
};
