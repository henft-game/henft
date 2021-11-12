const GameToken = artifacts.require("GameToken");
const BattleSystem = artifacts.require("BattleSystem");

module.exports = async function (deployer) {
  deployer.deploy(BattleSystem, GameToken.address);
};
