import React, { useState, useEffect, createContext } from "react";
import Web3 from 'web3';
import GameToken from 'contracts/GameToken.json';
import Market from 'contracts/Market.json';
import BattleSystem from 'contracts/BattleSystem.json';

export const Web3Context = createContext({ web3: null, accounts: null, contract: null, networkId: null, contractAddress: null, market: null, marketAddress: null, battleSystem: null, battleSystemAddress: null });

const Web3Provider = (props) => {
    const [web3, setWeb3] = useState();
    const [accounts, setAccounts] = useState();
    const [networkId, setNetworkId] = useState();
    
    const [contract, setContract] = useState();
    const [contractAddress, setContractAddress] = useState();
    
    const [market, setMarket] = useState();
    const [marketAddress, setMarketAddress] = useState();
    
    const [battleSystem, setBattleSystem] = useState();
    const [battleSystemAddress, setBattleSystemAddress] = useState();


    const createContext = async function () {

        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            })
            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            })
        }

        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");;
        setWeb3(web3);
        setAccounts(await web3.eth.getAccounts());

        const networkId = await web3.eth.net.getId();
        setNetworkId(networkId);
        const networkData = GameToken.networks[networkId];
        const networkMarketData = Market.networks[networkId];
        const networkBattleData = BattleSystem.networks[networkId];

        if (networkData) {
            const address = networkData.address;
            setContractAddress(address);
            setContract(new web3.eth.Contract(GameToken.abi, address));

            const addressMarket = networkMarketData.address;
            setMarketAddress(addressMarket);
            setMarket(new web3.eth.Contract( Market.abi, addressMarket));

            const addressBattle = networkBattleData.address;
            setBattleSystemAddress(addressBattle);
            setBattleSystem(new web3.eth.Contract(BattleSystem.abi, addressBattle));

        }
    }

    useEffect(() => {
        createContext();
    }, []);

    return (
        <Web3Context.Provider value={{ web3, accounts, contract, networkId, contractAddress, market, marketAddress, battleSystem, battleSystemAddress }}>
            {props.children}
        </Web3Context.Provider>
    );

}

export default Web3Provider;