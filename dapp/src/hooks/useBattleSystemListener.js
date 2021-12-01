import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useBattleSystemListener = (heroId, eventBattleSystemListener) => {

    const { data } = useContext(Web3Context);

    useEffect(() => {
        if (heroId !== '') {

            console.log("start battle listeners: " + heroId);

            let result = {};

            const listener = (attr) => {
                return (err, event) => {
                    if (!!err) {
                        console.log(err);
                    }
                    if (!!event) {
                        console.log("new event " + attr);
                        console.log(event);
                        result[attr] = event.returnValues;
                        if (!!result.battleResult && (result.battleResult.points === '0' || !!result.consumable) && !!result.levelUp) {
                            console.log("passei aqui");
                            eventBattleSystemListener(result);
                            result = {};
                        }
                    }
                }
            }

            const subs = [];

            subs.push(data?.battleSystem?.events.BattleEnd({ filter: { owner: data?.accounts[0], aHeroId: heroId + '' } }, listener('battleResult')));
            subs.push(data?.consumable?.events.ConsumableMinted({ filter: { owner: data?.accounts[0], heroId: heroId + '' } }, listener('consumable')));
            subs.push(data?.contract?.events.HeroLevelUp({ filter: { owner: data?.accounts[0], tokenId: heroId + '' } }, listener('levelUp')));

            return () => {
                console.log("stop battle listeners: " + heroId);
                for (let index = 0; index < subs.length; index++) {
                    subs[index].unsubscribe();
                }
            }
        }
    }, [heroId, data, eventBattleSystemListener]);

    return {};
}



export default useBattleSystemListener;