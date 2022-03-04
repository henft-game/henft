import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useBattleSystemListener = (heroId, reset) => {

    const { data } = useContext(Web3Context);
    const [battleResult, setBattleResult] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setBattleResult();

        return () => {
            
        }
    }, [reset])

    useEffect(() => {
        if (heroId !== '') {

            console.log("start battle listeners: " + heroId);

            let result = {};

            const listener = (attr) => {
                return (err, event) => {
                    subs[attr].unsubscribe();
                    if (!!err) {
                        console.log(err);
                    }
                    if (!!event) {
                        console.log("new event " + attr);
                        console.log(event);
                        result[attr] = event.returnValues;
                        if (!!result.battleResult && (result.battleResult.points === '0' || !!result.consumable) && !!result.levelUp) {
                            console.log("setting new battle result " + heroId);
                            setLoading(false);
                            setBattleResult(result);
                            result = {};
                        }
                    }
                }
            }

            const subs = {};

            subs['battleResult'] = (data?.battleSystemEvents?.events.BattleEnd({ fromBlock: 'latest', filter: { owner: data?.accounts[0], aHeroId: heroId + '' } }, listener('battleResult')));
            subs['consumable'] = (data?.consumableEvents?.events.ConsumableMinted({ fromBlock: 'latest', filter: { owner: data?.accounts[0], heroId: heroId + '' } }, listener('consumable')));
<<<<<<< HEAD
            subs['levelUp'] = (data?.contractEvents?.events.HeroLevelUp({ fromBlock: 'latest', filter: { owner: data?.accounts[0], tokenId: heroId + '' } }, listener('levelUp')));
=======
            subs['levelUp'] = (data?.contract?Events.events.HeroLevelUp({ fromBlock: 'latest', filter: { owner: data?.accounts[0], tokenId: heroId + '' } }, listener('levelUp')));
>>>>>>> e18184a8b3149539899621939b0bec3af8702029

            return () => {
                console.log("stop battle listeners: " + heroId);
                for (let index in subs) {
                    console.log(index);
                    subs[index].unsubscribe();
                }
            }
        }
    }, [heroId, data, reset]);

    return { loading, battleResult };
}



export default useBattleSystemListener;