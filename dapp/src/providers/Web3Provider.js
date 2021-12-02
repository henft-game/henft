import React, { useState, useEffect, createContext } from "react";
import Web3 from 'web3';
import GameToken from 'contracts/GameToken.json';
import Market from 'contracts/Market.json';
import BattleSystem from 'contracts/BattleSystem.json';
import Consumable from 'contracts/Consumable.json';

export const Web3Context = createContext({ data: null });

const Web3Provider = (props) => {
    const [data, setData] = useState({});

    const createContext = async function () {

        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            })
            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            })
        }

        const ret = {};

        console.log("current env: ");
        console.log(process.env);

        ret.web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_WEB3_ADDRESS);
        ret.networkId = await ret.web3.eth.net.getId();
        ret.accounts = await ret.web3.eth.getAccounts();


        ret.networkData = GameToken.networks[ret.networkId];
        ret.networkMarketData = Market.networks[ret.networkId];
        ret.networkBattleData = BattleSystem.networks[ret.networkId];
        ret.networkConsumableData = Consumable.networks[ret.networkId];

        if (ret.networkData) {
            ret.contractAddress = ret.networkData.address;
            ret.contract = new ret.web3.eth.Contract(GameToken.abi, ret.contractAddress);
        }

        if (ret.networkMarketData) {
            ret.marketAddress = ret.networkMarketData.address;
            ret.market = new ret.web3.eth.Contract(Market.abi, ret.marketAddress);
        }

        if (ret.networkBattleData) {
            ret.battleSystemAddress = ret.networkBattleData.address;
            ret.battleSystem = new ret.web3.eth.Contract(BattleSystem.abi, ret.battleSystemAddress);
        }

        if (ret.networkConsumableData) {
            ret.consumableAddress = ret.networkConsumableData.address;
            ret.consumable = new ret.web3.eth.Contract(Consumable.abi, ret.consumableAddress);
        }

        setData(ret);

    }

    useEffect(() => {
        createContext();
    }, []);

    return (
        <Web3Context.Provider value={{ data }}>
            {props.children}
        </Web3Context.Provider>
    );

}

export default Web3Provider;