import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useConsumables = () => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState();


    useEffect(() => {

        if (!!data?.accounts && !!data?.accounts[0]) {

            setLoading(true);

            const promisses = [];

            promisses.push(data?.consumable?.methods.getConsumablesByAddress(data?.accounts[0]).call());
            promisses.push(data?.contract?.methods.getHeroesByAddress(data?.accounts[0]).call());

            Promise.all(promisses).then((values) => {
                console.log("loading initial date consumables");
                setContent({
                    consumables: values[0],
                    heroesIds: values[1],
                });

                setLoading(false);
            });
        }

        return () => {
            setContent();
        };


    }, [data]);

    return { loading, content };
}

export default useConsumables;