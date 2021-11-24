import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroOwner = (heroId) => {

    const { contract } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [owner, setOwner] = useState('loading...');

    useEffect(() => {

        if (!!contract) {
            setLoading(true);
            setError(false);

            contract.methods.ownerOf(heroId).call().then(res => {
                setOwner(res);
                setLoading(false);

            }).catch(e => {
                setError(true);
                setLoading(false);
            });

        }

        return () => {

        };


    }, [heroId, contract]);

    return { loading, error, owner };
}

export default useHeroOwner;