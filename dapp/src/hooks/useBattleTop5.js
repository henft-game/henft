import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useBattleTop5 = () => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();

    useEffect(() => {

        if (!!data && !!data.battleSystem) {
            setLoading(true);

            const promisses = [];

            const date = new Date(), y = date.getFullYear(), m = date.getMonth();
            const firstDay = (new Date(y, m, 1).getTime() / 1000) + '';
            const lastDay = (new Date(y, m + 1, 1).getTime() / 1000) + '';

            promisses.push(data?.battleSystem?.methods.getTop5(firstDay, lastDay).call());

            Promise.all(promisses).then((values) => {
                console.log("loading top5 date");
                setContent({
                    top5: values[0],
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

export default useBattleTop5;