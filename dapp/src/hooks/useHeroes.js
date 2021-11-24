import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroes = () => {

    const { contract } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {

        if (!!contract) {
            setLoading(true);
            setError(false);


            contract.methods.getHeroes().call().then(res => {
                setHeroes(prev => {
                    return [...prev, ...res];
                });
                setLoading(false);

            }).catch(e => {
                setError(true);
                setLoading(false);
            });

        }

        return () => {

        };


    }, [contract]);

    return { loading, error, heroes };
}

export default useHeroes;