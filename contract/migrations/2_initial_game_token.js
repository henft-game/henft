const GameToken = artifacts.require('GameToken');

module.exports = async function (deployer) {
  await deployer.deploy(GameToken, 'HeNFT Game Token', 'HeNFT', 'https://ipfs.infura.io:5001/api/v0/cat?arg=');

  const gameToken = await GameToken.deployed();

};
