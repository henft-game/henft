import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroTokenURI = (heroId) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tokenURI, setTokenURI] = useState('');

    useEffect(() => {


        console.log("loading tokenURI: " + heroId);

        setLoading(true);
        setError(false);

        data?.contract?.methods.tokenURI(heroId).call().then(res => {
            setTokenURI(res);
            setLoading(false);

        }).catch(e => {
            setError(true);
            setLoading(false);
        });


        return () => {
            setTokenURI('');
        };


    }, [heroId, data]);

    return { loading, error, tokenURI };
}

export default useHeroTokenURI;