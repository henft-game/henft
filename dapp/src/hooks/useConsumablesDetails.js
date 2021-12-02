import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useConsumablesDetails = (heroId, reload) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [heroDetail, setHeroDetail] = useState();


    useEffect(() => {

        console.log("start hero detail listener: " + heroId);

        const load = (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log(subs);
                console.log("new event");
                console.log(event);
                setLoading(true);
                const promisses = [];

                promisses.push(data?.market?.methods.getAuction(heroId).call());
                promisses.push(data?.market?.methods.getSelling(heroId).call());
                promisses.push(data?.contract?.methods.ownerOf(heroId).call());

                Promise.all(promisses).then((values) => {
                    console.log("loading hero detail: " + heroId);
                    setHeroDetail({
                        auction: values[0],
                        selling: values[1],
                        owner: values[2],
                    });
                    setLoading(true);
                });
            }
        }

        const subs = [];

        subs.push(data?.market?.events.NewAuction({ filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.market?.events.CancelAuction({ filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.market?.events.NewSellingItem({ filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.market?.events.CancelSellingItem({ filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.market?.events.NewBid({ filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.market?.events.AuctionEnded({ filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.market?.events.ItemBought({ filter: { tokenId: heroId + '' } }, load));

        load(false, true);

        return () => {
            console.log("stop hero detail listener: " + heroId);
            setHeroDetail();
            for (let index = 0; index < subs.length; index++) {
                subs[index].unsubscribe();
            }
        }




    }, [data, heroId]);

    return { loading, heroDetail };
}

export default useConsumablesDetails;