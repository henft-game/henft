const GameToken = artifacts.require("GameToken");
const Consumable = artifacts.require("Consumable");
const BattleSystem = artifacts.require("BattleSystem");

module.exports = async function (deployer) {
  await deployer.deploy(BattleSystem, GameToken.address);
  
  const battleSystem = await BattleSystem.deployed();
  const gameToken = await GameToken.deployed();
  const consumable = await Consumable.deployed();
  
  battleSystem.setConsumableAddress(consumable.address);

  gameToken.setBattleAddress(BattleSystem.address);

  consumable.addMintPermittedAddress(BattleSystem.address);
};
