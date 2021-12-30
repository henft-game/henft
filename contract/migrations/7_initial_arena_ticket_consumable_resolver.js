const GameToken = artifacts.require("GameToken");
const BattleSystem = artifacts.require("BattleSystem");
const Consumable = artifacts.require("Consumable");
const ArenaTicketConsumableResolver = artifacts.require("resolvers/ArenaTicketConsumableResolver");

module.exports = async function (deployer) {
  await deployer.deploy(ArenaTicketConsumableResolver, GameToken.address, BattleSystem.address, Consumable.address);

  const arenaTicketConsumableResolver = await ArenaTicketConsumableResolver.deployed();
  const battleSystem = await BattleSystem.deployed();
  const consumable = await Consumable.deployed();

  battleSystem.addFreeWinPermittedAddress(arenaTicketConsumableResolver.address)

  consumable.setConsumableResolversAddress(2, arenaTicketConsumableResolver.address);

};
