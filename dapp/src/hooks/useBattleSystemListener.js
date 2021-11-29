import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useBattleSystemListener = (heroId, eventBattleSystemListener) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [hero, setHero] = useState();

    useEffect(() => {
        if (heroId !== '') {

            console.log("start battle listeners: " + heroId);


            const load = () => {
                console.log("reload hero: " + heroId);
                setLoading(true);

                data?.contract?.methods.getHeroComplete(heroId).call().then(res => {
                    setHero(res);
                    setLoading(false);

                }).catch(e => {
                    setLoading(false);
                });
            }

            const listener = (err, event) => {
                if (!!err) {
                    console.log(err);
                }
                if (!!event) {
                    console.log("new event");
                    console.log(event);
                    load();
                    eventBattleSystemListener(err, event);
                }
            }

            const subs = [];

            subs.push(data?.battleSystem?.events.BattleEnd({ filter: { owner: data?.accounts[0], aHeroId: heroId + '' } }, listener));

            return () => {
                console.log("stop battle listeners: " + heroId);
                for (let index = 0; index < subs.length; index++) {
                    subs[index].unsubscribe();
                }
            }
        }
    }, [heroId, data, eventBattleSystemListener]);

    return { loading, hero };
}



export default useBattleSystemListener;