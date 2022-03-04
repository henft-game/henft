# 1. Game

![logo](imgs/logo.png)

- [1. Game](#1-game)
  - [1.1. Ganache](#11-ganache)
    - [1.1.1. Building](#111-building)
    - [1.1.2. Running](#112-running)
  - [1.2. Solodity Contracts](#12-solodity-contracts)
    - [1.2.1. Compile](#121-compile)
    - [1.2.2. Compile and migrate](#122-compile-and-migrate)
    - [1.2.3. Init script](#123-init-script)
    - [1.2.4. Debug transaction](#124-debug-transaction)
  - [1.3. IPFS](#13-ipfs)
    - [1.3.1. Upload to IPFS](#131-upload-to-ipfs)
      - [Uploading all Hens to IPFS](#uploading-all-hens-to-ipfs)
  - [1.4. DApp](#14-dapp)
    - [1.4.1. Development](#141-development)
    - [1.4.2. Build](#142-build)


## 1.1. Ganache

### 1.1.1. Building

```sh
cd ganache
docker build . -t ganache
```

### 1.1.2. Running

```sh
docker run -p 8545:8545 ganache
```

## 1.2. Solodity Contracts


### 1.2.1. Compile

```sh
truffle compile
```

### 1.2.2. Compile and migrate

```sh
export NODE_OPTIONS=--openssl-legacy-provider
truffle migrate --compile-all --reset --network development
```

### 1.2.3. Init script

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
g = await GameToken.deployed();
multi = 1;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmZieH9MNZC2mCQkHnRhQWUtFXqxqbARgRANNeNCo2xoEU');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmPbS9C2YuyoAxtSjELeKshPjvuKmmFVdkmN9EzGSHxFiH');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmbnRmRzSKXKCGKAD2Gwte4jL8s1L52Cpvuxuw8fedV7pK');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'Qmekp6uf2wnDKP87xR9fLbxpYyNTmXMf96WTNixVrWJeCq');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmSxkabuipMxJETrPeFnEMWLEzVaPet4Ua48nZ3PvHMddx');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmfEJr9vjKT4MnaF24PfMnTj58rAm45tuccqKohYHKSTZh');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmdkYNBh13452PCoaatEBXJSzgBpMCcv4epu4WVDeyQ4Xy');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmVFL8cAX71SmqF3ydwKoJ3tQ8nBNGyekdVDibpehrWaZY');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmcaxrMJ1NmS3aDfrwFHuLBJA4XwrD5BZ1acddLuw4PA9y');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmXvYQgAPjUfUpwpbRaKCXzQfgKeDFbGThMdjRTMnrBrEr');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'Qma61jVXpkEU3BwxVKKBktZCLywt1FGu5eqxVToi1z2dQP');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmUhD5MjJPRbJ3YXxxdJPejMStxPCbA2zggwY16Uvu4LTT');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmUqnsZ6V553rjibF7cNhTzGWtSvmDtte364HoMzt2Wamc');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmXjQpeHhfhGXiDcUHXZUVwqjfpJhgs3LiBCdAjuVwrZNH');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmfBPEXHE72uaCSynuBHbrGkD3uyMFU43LTGiD5pXLJ2Kd');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmT1teN7mhY8QnUV8EYZoSgbf7FsA68GVfGyoxWPhxYszP');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmTt4E9xMB1Zyro5mqPCbpSCcSuqaMo8CnCCK6okFdCf5q');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmS5GjZWb3ZvxfH2E1Lzj3t5o9DQtR6ZkVkEShdFEbQn1e');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmSUd9zffTpsdur5TGCBK9DJg8kMpfEjuGHRSTZSbRtke7');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmbBiXhkaAN4wqJumGmF66jXk2YmHMGLi5dGBvkJDfqMFg');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmSHa62XeZuT2Ddx15tZbdLgJrvWMBbpnSCVZC61UmcWwT');}, multi * 10000); multi++;

multi = 1;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmdUNgcJwvrRxr9Jqt3LXicC2NNQex94gYXGs6bdPYrxHL');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmVSwUnyfEYLZDJv6mzYQKFumPZRoXn9Cd633yYQfWLuhR');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmNsoEYXW7jZQDYXN19pMJRutvSV3wP497VtMXUb793Tnb');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 2, 'QmP9qvdzH473ApibceUQvbvLEUoxJNCXivxmyjHCDPANum');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmTV7vnze5uv74mEGDwrpCTRCETSaEyD6CGAK5PzHG1Djr');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmXysGL8PRVemwTqLs8gQ4CCpF78VLHupQ2rJ5UsrUYWZi');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmTHCbK5ksfRCKPECo1Wbo1LB3H9LKYMmWbD4GgnYcohE1');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmUxyk5MLjueCw88zCodyfTAG9tExybPXTz8pQrdrLCgsG');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmeemAejYZRMWqs1gb5ziG1svYdz8NWnC39LAXSxLskV7t');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmaS91oaJz52RTrnko5AZYRw3kL1pQL17xsidUEsbTxghJ');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmeSfDZa6TsSd7qT2vojojxtcnPJHpZXdjxEEYRmpsRiDT');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 2, 'QmXgFjy5yoHZ8nZz5F8eLo9vfBCdhFc6v2LeTwER3ues67');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmWAyaoPT7FZUHkiP4G9zJUYmXXvwRAxbeABUKKmdyDX9y');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmQeHuu6B8ztKjFUCDT8MQgjkUzABiHLL7WBR2Jw7vPdLm');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmQDkyDgNfzeyE7SwkBra9xqbfSsKLpk9RUDsu4vQLbRBP');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmcLnZdA18XMGiURXswFhHLwdbUHPajbxDV52sYStphFsL');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmfPQjK8xUpfBE3W2GvHjoVHukcpz9wDWzAvFCtRMY5ZXk');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmXQPw4by5V4eDuZvZ9jhyp23PwXQEQw2srYAK9rc8oJoE');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmQzxrQCR1B6hv1AQDzA4x6pwxPt1K89r1SomeBHJWE9W7');}, multi * 10000); multi++;

setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmTFX2tV278vYSetU7KsyKwEebPyDFTPsnvsi3HkHUfxSD');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmVG7quNwWKKg5PFXXN6QUqqUJ3NDrLuVP5WQVFoKZuZbW');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmYntbVAsfG6m5asRZ3WrAeKb4NKH4TmEopexCbyN6Xked');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmPJjqVRN1UuVBkXsDo78K7LcdzZpnm6FNt7RiJuvv2PiY');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmWAAnNcU418drR2kGsey3g3TyK35JGApCwByQiAXsUMt4');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmZXXjtXU7o8c1ahUzd4nbeZvh3hiyBPinJK6bpqhxZ3U5');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmYf47zSKv2Yv2n3soabEDrxhhmwHzPqHHA2YTLD3UkkHf');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmYuDEPVji2pC6H1GBCBvnBF9SRDBZxM7wvwD73ACsemPT');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 2, 'QmPT5VyiRzymbVWKjjzNXCip8aoTcyBsq6EfdpziJtF5Jg');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmUmnS5Z31arqm6GeWnF2wpwohrYEgAC93rgwfdXEUUwTc');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 2, 'QmZMNj4fQ954fiiNvfxvUprnggxNJ6GbXXo5BK9QZpokBw');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 3, 'QmQW3Y1UZtBtEgNtK8gKTVmQEadJ7usCHKdKm5mfuzjkcc');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmRxKj3WKuSyyVRvabW1N8E7qmAtrpAE37z1nL5MSykor4');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'Qmdi8NuUN3ZGteUyD9TwXVqtD1EGNbj1Kw1pK7UjaQvq1J');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 2, 'QmX85CJv5aQPseVmuc4SfpF8YcnyDW3q4jHRSbv2U1aduA');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmY1Evun2G1kiEVzTHK84p4NBQDZaDM29cSot5psg1pGGj');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmfTQWQzBgjzXresP5Wr7VoeWjwyQnUEw9Wroy8zxt1Jyt');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 3, 'QmX3GXVHoPj373cY8UKq42YjbkkgsVSCUZ58UUGESNFHNZ');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmbeuuYU99EFV892G57Ds8Sf5T5cR8fDi1bpqSqGdQQv2w');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmNz2r2smKgGT8bf2Gyak1wfYxc3zNEcsVRWNdSnw2EdGn');}, multi * 10000); multi++;

setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmS16agYWFKX9eyD7SAtNxntt9hwjMGPsYQAfPkQen6X3h');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmYcNkqTmBWUeByoRXGwW8qT5va3zArEcYCQ6VDSuPKxpS');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 2, 'QmaXxpH1Esg348oN2jcmZUxcdHUcE8LQcPUfFhoWycPk8t');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmPpDST94YDvrAZMzzLpJ2rqeEeN4DxS862jpSdKtnvUw6');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmWvVP58mcA82BZzpfzPfqikJdrFdzFVfMVYMdr2puoMre');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmWvqeuCvm58uWRXyohafvB6xb6TAryiWEyX8kSgZqR3AU');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmaSav5y2HGNuFthpvwTaEKXKQjozM4TYf9xCd3Q2Ujhfs');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 1, 'QmWYWv7bqXm8kfkkrLrUo8d9K7t4v2v6ydMfgupNdgcGuC');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmNqxD3w26XMTazq3gm7tFPAQu4Xt4qpgraHxVhQm1n3wG');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmaZwhsPYfmBgLzetZJ3LRdb2M52uXNnvxZx1JmBbZExtx');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 0, 'QmbFzryAkLyxYndVAkQWd9GTUpWczqKHoXBDdTHBUoqXkM');}, multi * 10000); multi++;
setTimeout(async ()=>{console.log('new mint'), await g.mint(1, 0, 3, 'QmVx5aKX88TX7EeyHwMY9Sf8GekRPuE9f3HwXT9gxzQSpr');}, multi * 10000); multi++;

m.allowBuy(0, 1);


i.createAuction(0, (new Date().getTime() + 60000), web3.utils.toWei('1'));
i.bid(0, {value: web3.utils.toWei('1'), from: accounts[8]});
i.bid(0, {value: web3.utils.toWei('1.2'), from: accounts[9]});

web3.eth.getBalance(accounts[0]);
web3.eth.getBalance(accounts[8]);
web3.eth.getBalance(accounts[9]);

```

### 1.2.4. Debug transaction

```sh
truffle debug <TRANSACTION_ID>
```

## 1.3. IPFS


### 1.3.1. Upload to IPFS

```sh
curl -X POST -F file=@1.gif -u "20mcYaDIPn03iUWqbbBDYYLIfhd:ae7ee5b03105365a81cef92a54be9156" "https://ipfs.infura.io:5001/api/v0/add"

```

#### Uploading all Hens to IPFS

```sh
cd dapp/public/imgs/hens
ls -1 | xargs -I{} curl -X POST -s -F file=@{} -u "20mcYaDIPn03iUWqbbBDYYLIfhd:ae7ee5b03105365a81cef92a54be9156" "https://ipfs.infura.io:5001/api/v0/add" | jq ".Hash"

```



## 1.4. DApp

### 1.4.1. Development

```sh
npm start
```

### 1.4.2. Build

```sh
npm run build
```
