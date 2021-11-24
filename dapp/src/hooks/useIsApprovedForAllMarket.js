import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useIsApprovedForAllMarket = () => {

    const { accounts, contract, marketAddress } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isApprovedForAll, setIsApprovedForAll] = useState();

    useEffect(() => {

        if (!!accounts && !!accounts[0] && !!marketAddress && !!contract) {
            setLoading(true);
            setError(false);

            contract.methods.isApprovedForAll(accounts[0], marketAddress).call({ from: accounts[0] }).then(res => {
                console.log(res);
                setIsApprovedForAll(res);
                setLoading(false);

            }).catch(e => {
                setError(true);
                setLoading(false);
            });
        }

        return () => {

        };


    }, [accounts, contract, marketAddress]);

    return { loading, error, isApprovedForAll };
}

export default useIsApprovedForAllMarket;