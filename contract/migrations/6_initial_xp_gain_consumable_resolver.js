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

  consumable.setConsumableTokenURI(0, 'QmZUuCTKi9sWyeLwbH1ZY4ydNqg8qhLxuS8c79DMjqBzob');
  consumable.setConsumableTokenURI(1, 'QmbKCgUpJE8AxnyDisk5od7yqm4MnJdRSu9jWFJsDTsVPD');
  consumable.setConsumableTokenURI(2, 'QmR68drJru2hGXMZ3q11wkcFpLznxE5qjS4Qhs2mDgrW1J');
  consumable.setConsumableTokenURI(3, 'QmRJSXGw2VzznnzFjg8kwjqtZeLBDJoEaqSSGmggLiDjFU');
};
