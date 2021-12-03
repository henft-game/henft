const GameToken = artifacts.require("GameToken");

module.exports = async function (deployer) {
  await deployer.deploy(GameToken, "HeNFT Game Token", "HeNFT", "https://ipfs.infura.io:5001/api/v0/cat?arg=");

  const gameToken = await GameToken.deployed();

  console.log("minting heroes");

  await gameToken.mint(1, 0, 0, 'QmfEJr9vjKT4MnaF24PfMnTj58rAm45tuccqKohYHKSTZh');
  await gameToken.mint(1, 0, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
  await gameToken.mint(1, 0, 0, 'QmQeHuu6B8ztKjFUCDT8MQgjkUzABiHLL7WBR2Jw7vPdLm');
  await gameToken.mint(1, 1, 0, 'QmdkYNBh13452PCoaatEBXJSzgBpMCcv4epu4WVDeyQ4Xy');
  await gameToken.mint(1, 1, 0, 'QmdUNgcJwvrRxr9Jqt3LXicC2NNQex94gYXGs6bdPYrxHL');
  await gameToken.mint(1, 1, 0, 'QmQDkyDgNfzeyE7SwkBra9xqbfSsKLpk9RUDsu4vQLbRBP');
  await gameToken.mint(1, 2, 0, 'QmVFL8cAX71SmqF3ydwKoJ3tQ8nBNGyekdVDibpehrWaZY');
  await gameToken.mint(1, 2, 0, 'QmVSwUnyfEYLZDJv6mzYQKFumPZRoXn9Cd633yYQfWLuhR');
  await gameToken.mint(1, 2, 0, 'QmcLnZdA18XMGiURXswFhHLwdbUHPajbxDV52sYStphFsL');
  await gameToken.mint(1, 3, 0, 'QmeXANcW12WvBBzQcTTHp1yLsUhf4D4F2rhjWk4BdVrubf');
  await gameToken.mint(1, 3, 0, 'QmNkDwQEUt8H8cA67iKLKLKYMacSvCgeLaJTRMJGWepuE8');
  await gameToken.mint(1, 3, 0, 'QmYqsmXCP1GdbXSVvwY46dt3EhruMpshKK3ikKiR6Nt7b2');
  await gameToken.mint(1, 0, 0, 'QmXvYQgAPjUfUpwpbRaKCXzQfgKeDFbGThMdjRTMnrBrEr');
  await gameToken.mint(1, 0, 0, 'QmTHCbK5ksfRCKPECo1Wbo1LB3H9LKYMmWbD4GgnYcohE1');
  await gameToken.mint(1, 0, 0, 'QmVG7quNwWKKg5PFXXN6QUqqUJ3NDrLuVP5WQVFoKZuZbW');

};
