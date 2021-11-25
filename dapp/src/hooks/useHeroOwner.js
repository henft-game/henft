import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroOwner = (heroId, reload) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [owner, setOwner] = useState('loading...');

    useEffect(() => {

        console.log("loading owner: " + heroId);

        setLoading(true);
        setError(false);
        setOwner('loading...');

        data?.contract?.methods.ownerOf(heroId).call().then(res => {
            setOwner(res);
            setLoading(false);

        }).catch(e => {
            setError(true);
            setLoading(false);
        });


        return () => {
            setOwner('');
        };


    }, [heroId, data, reload]);

    return { loading, error, owner };
}

export default useHeroOwner;