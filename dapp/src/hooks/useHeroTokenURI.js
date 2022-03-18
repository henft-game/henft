import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroTokenURI = (heroId) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [tokenURI, setTokenURI] = useState('');

    useEffect(() => {

        if (!!heroId || heroId === 0) {
            console.log("loading tokenURI: " + heroId);

            setLoading(true);

            data?.contract?.methods.tokenURI(heroId).call().then(res => {
                setTokenURI(res);
                setLoading(false);
            }).catch(e => {
                setLoading(false);
            });


            return () => {
                setTokenURI('');
            };
        }

    }, [heroId, data]);

    return { loading, tokenURI };
}

export default useHeroTokenURI;