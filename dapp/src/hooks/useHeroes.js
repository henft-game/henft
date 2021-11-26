import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroes = () => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();



    useEffect(() => {

        setLoading(true);

        const promisses = [];

        promisses.push(data?.contract?.methods.getHeroes().call());
        if (!!data?.accounts && !!data?.accounts[0]) {
            promisses.push(data?.contract?.methods.isApprovedForAll(data?.accounts[0], data?.marketAddress).call());
        }


        Promise.all(promisses).then((values) => {
            console.log("loading initial date");
            setContent({
                heroes: values[0],
                isApprovedForAll: !!data?.accounts && !!data?.accounts[0] ? values[1] : false
            });
            setLoading(false);
        });


        return () => {
            setContent();
        };


    }, [data]);

    return { loading, content };
}

export default useHeroes;