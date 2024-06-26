import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroes = () => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();



    useEffect(() => {

        if (!!data && !!data.market && !!data.contract) {
            setLoading(true);

            const promisses = [];


            promisses.push(data?.contract?.methods.getHeroes().call());
            promisses.push(data?.market?.methods.getSellingHeroesIds().call());
            if (!!data?.accounts && !!data?.accounts[0]) {
                promisses.push(data?.contract?.methods.getHeroesByAddress(data?.accounts[0]).call());
                promisses.push(data?.contract?.methods.isApprovedForAll(data?.accounts[0], data?.marketAddress).call());
            }

            Promise.all(promisses).then((values) => {
                console.log("loading initial date");
                setContent({
                    heroes: values[0],
                    sellingHeroesIds: values[1],
                    ownedByMe: !!data?.accounts && !!data?.accounts[0] ? values[2] : [],
                    isApprovedForAll: !!data?.accounts && !!data?.accounts[0] ? values[3] : false
                });

                console.log(values);
                setLoading(false);
            });
        }


        return () => {
            setContent();
        };


    }, [data]);

    return { loading, content };
}

export default useHeroes;