import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useConsumableTokenURI = (consumableId) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [tokenURI, setTokenURI] = useState('');

    useEffect(() => {


        console.log("loading tokenURI: " + consumableId);

        setLoading(true);

        data?.consumable?.methods.tokenURI(consumableId).call().then(res => {
            setTokenURI(res);
            setLoading(false);

        }).catch(e => {
            setLoading(false);
        });


        return () => {
            setTokenURI('');
        };


    }, [consumableId, data]);

    return { loading, tokenURI };
}

export default useConsumableTokenURI;