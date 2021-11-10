import React, { useState, useEffect, createContext } from "react";
import Web3 from 'web3';
import GameToken from 'contracts/GameToken.json';

export const Web3Context = createContext({ web3: null, accounts: null, contract: null, networkId: null, networkAddress: null });

const Web3Provider = (props) => {
    const [web3, setWeb3] = useState();
    const [accounts, setAccounts] = useState();
    const [contract, setContract] = useState();
    const [networkId, setNetworkId] = useState();
    const [networkAddress, setNetworkAddress] = useState();


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
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        const networkId = await web3.eth.net.getId();
        setNetworkId(networkId);
        const networkData = GameToken.networks[networkId];

        if (networkData) {
            const abi = GameToken.abi;
            const address = networkData.address;
            setNetworkAddress(address);
            const contract = new web3.eth.Contract(abi, address);

            setContract(contract);

        }
    }

    useEffect(() => {
        createContext();
    }, []);

    return (
        <Web3Context.Provider value={{ web3, accounts, contract, networkId, networkAddress }}>
            {props.children}
        </Web3Context.Provider>
    );

}

export default Web3Provider;