# 1. Game

- [1. Game](#1-game)
  - [1.1. Compile](#11-compile)
  - [1.2. Compile and migrate](#12-compile-and-migrate)
  - [1.3. Init script](#13-init-script)
  - [Debug transaction](#debug-transaction)
  - [1.4. Upload to IPFS](#14-upload-to-ipfs)

## 1.1. Compile

```sh
truffle compile
```

## 1.2. Compile and migrate

```sh
truffle migrate --compile-all --reset --network development
```

## 1.3. Init script

Start the truffle console:


```sh
truffle console
```

Then execute the following script:

```js

g = await GameToken.deployed();
m = await Market.deployed();
b = await BattleSystem.deployed();
c = await Consumable.deployed();
g.mint(0, 0, 'QmfEJr9vjKT4MnaF24PfMnTj58rAm45tuccqKohYHKSTZh');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 3, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 2, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 1, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');
g.mint(1, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');

m.allowBuy(0, 1);


i.createAuction(0, (new Date().getTime() + 60000), web3.utils.toWei('1'));
i.bid(0, {value: web3.utils.toWei('1'), from: accounts[8]});
i.bid(0, {value: web3.utils.toWei('1.2'), from: accounts[9]});

web3.eth.getBalance(accounts[0]);
web3.eth.getBalance(accounts[8]);
web3.eth.getBalance(accounts[9]);

```

## Debug transaction

```sh
truffle debug <TRANSACTION_ID>
```

## 1.4. Upload to IPFS

```sh
curl -X POST -F file=@1.gif -u "20mcYaDIPn03iUWqbbBDYYLIfhd:ae7ee5b03105365a81cef92a54be9156" "https://ipfs.infura.io:5001/api/v0/add"

```