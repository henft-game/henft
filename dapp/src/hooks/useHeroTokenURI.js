import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroTokenURI = (heroId) => {

    const { contract } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tokenURI, setTokenURI] = useState('');

    useEffect(() => {

        if (!!contract) {
            setLoading(true);
            setError(false);

            contract.methods.tokenURI(heroId).call().then(res => {
                setTokenURI(res);
                setLoading(false);

            }).catch(e => {
                setError(true);
                setLoading(false);
            });

        }

        return () => {

        };


    }, [heroId, contract]);

    return { loading, error, tokenURI };
}

export default useHeroTokenURI;