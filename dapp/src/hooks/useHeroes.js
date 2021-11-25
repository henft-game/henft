import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroes = () => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {

        setLoading(true);
        setError(false);

        data?.contract?.methods.getHeroes().call().then(res => {
            console.log("setHeroes");
            setHeroes(prev => {
                return [...prev, ...res];
            });
            setLoading(false);

        }).catch(e => {
            setError(true);
            setLoading(false);
        });


        return () => {
            setHeroes([]);
        };


    }, [data]);

    return { loading, error, heroes };
}

export default useHeroes;