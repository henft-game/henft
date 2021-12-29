import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroOwnerOf = (heroId) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [ownerOf, setOwnerOf] = useState('');

    useEffect(() => {

        if (!!heroId) {
            console.log("loading ownerOf: " + heroId);

            setLoading(true);

            data?.contract?.methods.ownerOf(heroId).call().then(res => {
                setOwnerOf(res);
                setLoading(false);

            }).catch(e => {
                setLoading(false);
            });


            return () => {
                setOwnerOf('');
            };
        }

    }, [heroId, data]);

    return { loading, ownerOf };
}

export default useHeroOwnerOf;