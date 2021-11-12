const GameToken = artifacts.require("GameToken");
const Market = artifacts.require("Market");

module.exports = async function (deployer) {
  console.log(GameToken.address);
  deployer.deploy(Market, GameToken.address);
};
