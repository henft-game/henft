import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroSelling = (heroId) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [sellingContent, setSellingContent] = useState();


    useEffect(() => {

        if (!!data?.market ) {

            setLoading(true);

            const promisses = [];

            promisses.push(data?.market?.methods.getRandomSelling(parseInt(Math.random() * 10000)).call());
            promisses.push(data?.market?.methods.getLowestSelling().call());

            Promise.all(promisses).then((values) => {
                console.log("loading selling hero");
                setSellingContent({
                    randomSellingId: values[0],
                    lowestSellingId: values[1],
                });
                setLoading(false);
            });
        }

        return () => {
            setSellingContent();
        };

    }, [data, heroId]);

    return { loading, sellingContent };
}

export default useHeroSelling;