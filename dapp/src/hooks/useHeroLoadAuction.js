import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroLoadAuction = (heroId, reload) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [auction, setAuction] = useState({ minValue: '0', currValue: '0', seller: '' });

    useEffect(() => {

        setLoading(true);
        setError(false);

        console.log("loading auction: " + heroId);

        data?.market?.methods.getAuction(heroId).call().then(res => {
            setAuction(res);
            setLoading(false);

        }).catch(e => {
            setError(true);
            setLoading(false);
        });


        return () => {
            setAuction({ minValue: '0', currValue: '0', seller: '' });
        };


    }, [heroId, data, reload]);

    return { loading, error, auction };
}

export default useHeroLoadAuction;