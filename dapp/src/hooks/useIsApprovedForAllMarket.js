import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useIsApprovedForAllMarket = () => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isApprovedForAll, setIsApprovedForAll] = useState();

    useEffect(() => {

        setLoading(true);
        setError(false);


        data?.contract?.methods.isApprovedForAll(data?.accounts[0], data?.marketAddress).call().then(res => {
            setIsApprovedForAll(res);
            setLoading(false);

        }).catch(e => {
            setError(true);
            setLoading(false);
        });

        return () => {
            setIsApprovedForAll(null);
        };


    }, [data]);

    return { loading, error, isApprovedForAll };
}

export default useIsApprovedForAllMarket;