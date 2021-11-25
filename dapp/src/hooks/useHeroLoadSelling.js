import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroLoadSelling = (heroId, reload) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selling, setSelling] = useState({ value: '0', seller: '' });

    useEffect(() => {

        setLoading(true);
        setError(false);

        console.log("loading selling: " + heroId);

        data?.market?.methods.getSelling(heroId).call().then(res => {
            setSelling(res);
            setLoading(false);

        }).catch(e => {
            setError(true);
            setLoading(false);
        });


        return () => {
            setSelling({ value: '0', seller: '' });
        };


    }, [heroId, data, reload]);

    return { loading, error, selling };
}

export default useHeroLoadSelling;