import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroes = (page) => {

    const { contract } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [heroes, setHeroes] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {

        if (!!contract) {
            setLoading(true);
            setError(false);


            contract.methods.getHeroes(50, page).call().then(res => {
                setHeroes(prev => {
                    return [...prev, ...res];
                });
                setHasMore(res.length === 50);
                setLoading(false);

            }).catch(e => {
                setError(true);
                setLoading(false);
            });

        }


    }, [page, contract]);

    return { loading, error, heroes, hasMore };
}

export default useHeroes;