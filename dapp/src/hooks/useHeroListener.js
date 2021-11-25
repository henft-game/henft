import { useContext, useEffect } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroListener = (heroId, eventHeroListener, eventBattleSystemListener, eventMarketListener) => {

    const { data } = useContext(Web3Context);

    useEffect(() => {
        if (heroId !== '') {

            console.log("start listeners: " + heroId);

            const subs = [];

            subs.push(data?.contract?.events.HeroLevelUp({ filter: { tokenId: heroId + '' } }, eventHeroListener));
            subs.push(data?.contract.events.NewCurrXP({ filter: { tokenId: heroId + '' } }, eventHeroListener));

            subs.push(data?.battleSystem?.events.BattleEnd({ filter: { owner: data?.accounts[0], aHeroId: heroId + '' } }, eventBattleSystemListener));

            subs.push(data?.market?.events.NewAuction({ filter: { tokenId: heroId + '' } }, eventMarketListener));
            subs.push(data?.market?.events.CancelAuction({ filter: { tokenId: heroId + '' } }, eventMarketListener));
            subs.push(data?.market?.events.NewSellingItem({ filter: { tokenId: heroId + '' } }, eventMarketListener));
            subs.push(data?.market?.events.CancelSellingItem({ filter: { tokenId: heroId + '' } }, eventMarketListener));
            subs.push(data?.market?.events.NewBid({ filter: { tokenId: heroId + '' } }, eventMarketListener));
            subs.push(data?.market?.events.AuctionEnded({ filter: { tokenId: heroId + '' } }, eventMarketListener));
            subs.push(data?.market?.events.ItemBought({ filter: { tokenId: heroId + '' } }, eventMarketListener));

            return () => {
                console.log("stop listeners: " + heroId);
                for (let index = 0; index < subs.length; index++) {
                    subs[index].unsubscribe();
                }
            }
        }
    }, [heroId, data, eventHeroListener, eventBattleSystemListener, eventMarketListener]);

    return;
}



export default useHeroListener;