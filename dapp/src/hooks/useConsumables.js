import { useContext, useEffect, useState } from 'react';
import ConsumableGridItem from '../components/ConsumableGridItem';
import { Web3Context } from '../providers/Web3Provider';

const useConsumables = () => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();


    useEffect(() => {

        setLoading(true);

        const promisses = [];

        promisses.push(data?.consumable?.methods.getConsumablesByAddress(data?.accounts[0]).call());

        Promise.all(promisses).then((values) => {
            console.log("loading initial date consumables");
            setContent({
                consumables: values[0],
            });
            setLoading(false);
        });


        return () => {
            setContent();
        };


    }, [data]);

    return { loading, content };
}

export default useConsumables;