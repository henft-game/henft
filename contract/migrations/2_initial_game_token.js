const GameToken = artifacts.require("GameToken");

module.exports = async function (deployer) {
  deployer.deploy(GameToken, "GameToken NFT", "GTNFT");
};
