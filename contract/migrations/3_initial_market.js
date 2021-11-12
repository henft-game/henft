const GameToken = artifacts.require("GameToken");
const Market = artifacts.require("Market");

module.exports = async function (deployer) {
  deployer.deploy(Market, GameToken.address);
};
