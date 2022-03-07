import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const useHeroDetails = (heroId) => {

    const { data } = useContext(Web3Context);

    const [loading, setLoading] = useState(true);
    const [heroDetail, setHeroDetail] = useState();


    useEffect(() => {

        console.log("hero detail listener: " + heroId);

        const subs = [];

        console.log("starting hero detail listener: " + heroId);
        subs.push(data?.marketEvents?.events.NewAuction({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log(event.event + ": " + heroId);
                console.log(event.returnValues);
                setHeroDetail({
                    auction: { currValue: '0', minValue: event.returnValues.minValue, seller: event.returnValues.seller },
                    selling: { value: '0' },
                    owner: event.returnValues.newOwner
                });
            }
        }));
        subs.push(data?.marketEvents?.events.CancelAuction({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log(event.event + ": " + heroId);
                console.log(event.returnValues);
                setHeroDetail({
                    auction: { minValue: '0' },
                    selling: { value: '0' },
                    owner: event.returnValues.newOwner
                });
            }
        }));
        subs.push(data?.marketEvents?.events.NewBid({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log(event.event + ": " + heroId);
                console.log(event.returnValues);
                setHeroDetail(prev => ({
                    auction: { 
                        ...prev.auction, 
                        currValue: event.returnValues.value 
                    },
                    selling: { value: '0' },
                    owner: prev.owner
                }));
            }
        }));
        subs.push(data?.marketEvents?.events.AuctionEnded({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log(event.event + ": " + heroId);
                console.log(event.returnValues);
                setHeroDetail({
                    auction: { minValue: '0' },
                    selling: { value: '0' },
                    owner: event.returnValues.newOwner
                });
            }
        }));

        subs.push(data?.marketEvents?.events.NewSellingItem({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log(event.event + ": " + heroId);
                console.log(event.returnValues);
                setHeroDetail({
                    auction: { minValue: '0' },
                    selling: { value: event.returnValues.value, seller: event.returnValues.seller },
                    owner: event.returnValues.newOwner
                });
            }
        }));
        subs.push(data?.marketEvents?.events.CancelSellingItem({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log(event.event + ": " + heroId);
                console.log(event.returnValues);
                setHeroDetail({
                    auction: { minValue: '0' },
                    selling: { value: '0' },
                    owner: event.returnValues.newOwner
                });
            }
        }));
        subs.push(data?.marketEvents?.events.ItemBought({ fromBlock: 'latest', filter: { tokenId: heroId + '' } }, (err, event) => {
            if (!!err) {
                console.log(err);
            }
            if (!!event) {
                console.log(event.event + ": " + heroId);
                console.log(event.returnValues);
                setHeroDetail({
                    auction: { minValue: '0' },
                    selling: { value: '0' },
                    owner: event.returnValues.newOwner
                });
            }
        }));

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