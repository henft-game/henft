# Game

## Init script

```js

i = await GameToken.deployed();
j = await Market.deployed();
i.mint(0, 0, 'QmfEJr9vjKT4MnaF24PfMnTj58rAm45tuccqKohYHKSTZh');
i.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');

j.allowBuy(0, 1);


i.createAuction(0, (new Date().getTime() + 60000), web3.utils.toWei('1'));
i.bid(0, {value: web3.utils.toWei('1'), from: accounts[8]});
i.bid(0, {value: web3.utils.toWei('1.2'), from: accounts[9]});

web3.eth.getBalance(accounts[0]);
web3.eth.getBalance(accounts[8]);
web3.eth.getBalance(accounts[9]);

```