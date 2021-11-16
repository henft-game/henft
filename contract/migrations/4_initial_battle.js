const GameToken = artifacts.require("GameToken");
const BattleSystem = artifacts.require("BattleSystem");

module.exports = async function (deployer) {
  await deployer.deploy(BattleSystem, GameToken.address);
  const gameToken = await GameToken.deployed();
  gameToken.setBattleAddress(BattleSystem.address);
};
