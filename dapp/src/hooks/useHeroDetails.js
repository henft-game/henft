import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroDetails = (heroId) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [heroDetail, setHeroDetail] = useState();


    useEffect(() => {

        console.log("hero detail listener: " + heroId);

        const transactionsHashs = [];

        const load = (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log("new event: " + heroId);
                console.log(event);
                if (transactionsHashs.indexOf(event.transactionHash) <= -1) {
                    transactionsHashs.push(event.transactionHash);
                    setLoading(true);

                    setTimeout(() => {
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
                            setLoading(false);
                        });
                    }, 1000);
                } else {
                    console.log("event ignored: " + heroId);
                }
            }
        }

        const subs = [];

        console.log("starting hero detail listener: " + heroId);
        subs.push(data?.marketEvents?.events.NewAuction({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.marketEvents?.events.CancelAuction({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.marketEvents?.events.NewSellingItem({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.marketEvents?.events.CancelSellingItem({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.marketEvents?.events.NewBid({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.marketEvents?.events.AuctionEnded({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, load));
        subs.push(data?.marketEvents?.events.ItemBought({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, load));

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
            setLoading(false);
        });

        return () => {
            console.log("stoping hero detail listener: " + heroId);
            setHeroDetail();
            for (let index = 0; index < subs.length; index++) {
                subs[index].unsubscribe();
            }
        }




    }, [data, heroId]);

    return { loading, heroDetail };
}

export default useHeroDetails;