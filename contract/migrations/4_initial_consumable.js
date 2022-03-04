const Consumable = artifacts.require("Consumable");

module.exports = async function (deployer) {
  await deployer.deploy(Consumable, "HeNFT Consumable Token", "HeCNFT", "https://ipfs.io/ipfs/");
  
  const consumable = await Consumable.deployed();
  
  consumable.setConsumableTokenURI(0, 'QmZUuCTKi9sWyeLwbH1ZY4ydNqg8qhLxuS8c79DMjqBzob');
  consumable.setConsumableTokenURI(1, 'QmbKCgUpJE8AxnyDisk5od7yqm4MnJdRSu9jWFJsDTsVPD');
  consumable.setConsumableTokenURI(2, 'QmR68drJru2hGXMZ3q11wkcFpLznxE5qjS4Qhs2mDgrW1J');
  consumable.setConsumableTokenURI(3, 'QmRJSXGw2VzznnzFjg8kwjqtZeLBDJoEaqSSGmggLiDjFU');

};
