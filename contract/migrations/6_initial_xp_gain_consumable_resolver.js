const GameToken = artifacts.require("GameToken");
const Consumable = artifacts.require("Consumable");
const XPGainConsumableResolver = artifacts.require("resolvers/XPGainConsumableResolver");

module.exports = async function (deployer) {
  await deployer.deploy(XPGainConsumableResolver, GameToken.address, Consumable.address);
  
  const xpGainConsumableResolver = await XPGainConsumableResolver.deployed();
  const gameToken = await GameToken.deployed();
  const consumable = await Consumable.deployed();
  
  gameToken.addLevelUpPermittedAddress(xpGainConsumableResolver.address);

  consumable.setConsumableResolversAddress(0, xpGainConsumableResolver.address);
  consumable.setConsumableResolversAddress(1, xpGainConsumableResolver.address);

};
