import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHero = (heroId, reload) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hero, setHero] = useState();

    useEffect(() => {

        if (reload > 0) {

            console.log("load hero: " + heroId);

            setLoading(true);
            setError(false);

            data?.contract?.methods.getHeroComplete(heroId).call().then(res => {
                setHero(res);
                setLoading(false);

            }).catch(e => {
                setError(true);
                setLoading(false);
            });

        }

        return () => {
            setHero(null);
        };


    }, [heroId, data, reload]);

    return { loading, error, hero };
}


export default useHero;