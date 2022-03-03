const GameToken = artifacts.require('GameToken');

module.exports = async function (deployer) {
  await deployer.deploy(GameToken, 'HeNFT Game Token', 'HeNFT', 'https://ipfs.io/ipfs/');

  const gameToken = await GameToken.deployed();

};
