import { Grid, Box } from '@mui/material';
import { styled } from '@mui/styles';
import React, { Fragment, useContext, useEffect, useState, useRef, useCallback } from 'react';
import HeroCard from '../components/HeroCard';
import useHeroes from '../hooks/useHeroes';
import { Web3Context } from '../providers/Web3Provider';
import SellDialog from '../components/SellDialog';
import CreateAuctionDialog from '../components/CreateAuctionDialog';
import BidDialog from '../components/BidDialog';
import ConfirmMarketDialog from '../components/ConfirmMarketDialog';
import BattleHistoryDialog from '../components/BattleHistoryDialog';
import BattleResultDialog from '../components/BattleResultDialog';

const Heroes = () => {

    const Loading = styled('div')(({ theme }) => ({
        padding: 20,
    }));

    const HeroesBox = styled(Box)(({ theme }) => ({
        "&&": {
            paddingTop: '140px',
        },
    }));
    const HeroesGrid = styled(Grid)(({ theme }) => ({
        "&&": {
            margin: 'auto',
            background: '#DCC1A1',
            border: '4px solid #61422D',
            padding: '10px',
            borderRadius: '4px',
        },
        [theme.breakpoints.down('sm')]: {
            "&&": {
                padding: 0,
                border: 'none',
                background: 'none',
            },
        },
    }));

    const { web3, contract, battleSystem, accounts, market, marketAddress } = useContext(Web3Context);

    const [myHeroes, setMyHeroes] = useState([]);
    const [isApprovedForAll, setIsApprovedForAll] = useState(false);
    const [page, setPage] = useState(0);

    const [battles, setBattles] = useState([]);
    const [battleResult, setBattleResult] = useState();

    const { loading, heroes, hasMore } = useHeroes(page);

    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (loading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore]);


    const loadMyHeroes = async function () {
        setMyHeroes(await contract.methods.getMyHeroes().call({ from: accounts[0] }));
    }

    const isApprovalForAll = async function () {
        setIsApprovedForAll(await contract.methods.isApprovedForAll(accounts[0], marketAddress).call({ from: accounts[0] }));
    }

    const bid = async function (value) {
        await market.methods.bid(token).send({ from: accounts[0], value: web3.utils.toWei(value) });
        handleCloseBidDialog();
    }

    const createAuction = async function (auctionEnd, value) {
        await market.methods.createAuction(token, auctionEnd, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseCreateAuctionDialog();
    }

    const setApprovalForAll = async function () {
        await contract.methods.setApprovalForAll(marketAddress, true).send({ from: accounts[0] });
        handleCloseConfirmMarketDialog();
        isApprovalForAll();
    }

    const allowBuy = async function (value) {
        await market.methods.allowBuy(token, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseSellDialog();
    }

    useEffect(() => {
        if (!!contract && !!marketAddress) {
            if (!!accounts[0]) {
                loadMyHeroes();
                isApprovalForAll();
            }

            contract.events.Transfer((err, event) => {
                //loadHeroes();
            });

        }
    }, [contract, accounts, marketAddress])

    const [token, setToken] = useState();
    const [minBid, setMinBid] = useState('0');
    const [openedSellDialog, setOpenedSellDialog] = useState(false);

    const openSellDialog = () => {
        setOpenedSellDialog(true);
    }

    const handleCloseSellDialog = () => {
        setOpenedSellDialog(false);
    }

    const [openedCreateAuctionDialog, setOpenedCreateAuctionDialog] = useState(false);

    const openCreateAuctionDialog = (token) => {
        setToken(token);
        setOpenedCreateAuctionDialog(true);
    }

    const handleCloseCreateAuctionDialog = () => {
        setOpenedCreateAuctionDialog(false);
    }

    const [openedBidDialog, setOpenedBidDialog] = useState(false);

    const openBidDialog = (token, minBid) => {
        setToken(token);
        setMinBid(minBid);
        setOpenedBidDialog(true);
    }

    const handleCloseBidDialog = () => {
        setOpenedBidDialog(false);
    }

    const [openedConfirmMarketDialog, setOpenedConfirmMarketDialog] = useState(false);

    const openConfirmMarketDialog = (token) => {
        setToken(token);
        setOpenedConfirmMarketDialog(true);
    }

    const handleCloseConfirmMarketDialog = () => {
        setOpenedConfirmMarketDialog(false);
    }

    const [openedBattleHistoryDialog, setOpenedBattleHistoryDialog] = useState(false);

    const openBattleHistoryDialog = async (token) => {
        setToken(token);
        const ret = await battleSystem.methods.getBattles(token).call({ from: accounts[0] });
        setBattles([...ret].reverse());
        setOpenedBattleHistoryDialog(true);

    }

    const handleCloseBattleHistoryDialog = () => {
        setOpenedBattleHistoryDialog(false);
    }

    const [openedBattleResultDialog, setOpenedBattleResultDialog] = useState(false);

    const openBattleResultDialog = async (token) => {
        setToken(token);
        setOpenedBattleResultDialog(true);

    }

    const handleCloseBattleResultDialog = () => {
        setOpenedBattleResultDialog(false);
    }

    return (
        <Fragment>
            <HeroesBox>
                <Grid container>
                    <HeroesGrid item xs={12} md={12} lg={10} xl={8}>
                        <Grid container spacing={2}>
                            {heroes.map((hero, heroId) => {
                                return (
                                    <Grid ref={heroes.length - 5 === heroId + 1 ? lastElementRef : null} key={heroId} item xs={12} md={6} lg={6} xl={4} xxl={3}>
                                        <HeroCard heroInstance={hero} token={heroId}
                                            ownedByMe={myHeroes.indexOf(heroId + '') > -1}
                                            isApprovedForAll={isApprovedForAll}
                                            openSellDialog={openSellDialog}
                                            setBattleResult={setBattleResult}
                                            openBattleResultDialog={openBattleResultDialog}
                                            openCreateAuctionDialog={openCreateAuctionDialog}
                                            openConfirmMarketDialog={openConfirmMarketDialog}
                                            openBidDialog={openBidDialog}
                                            openBattleHistoryDialog={openBattleHistoryDialog}
                                        />
                                    </Grid>
                                );
                            })}
                            {loading &&
                                <Loading>loading...</Loading>
                            }
                        </Grid>
                    </HeroesGrid>
                </Grid>

            </HeroesBox>

            <ConfirmMarketDialog open={openedConfirmMarketDialog} handleClose={handleCloseConfirmMarketDialog} setApprovalForAll={setApprovalForAll} />
            <SellDialog token={token} open={openedSellDialog} handleClose={handleCloseSellDialog} allowBuy={allowBuy} />
            <CreateAuctionDialog token={token} open={openedCreateAuctionDialog} handleClose={handleCloseCreateAuctionDialog} createAuction={createAuction} />
            <BidDialog token={token} open={openedBidDialog} handleClose={handleCloseBidDialog} bid={bid} minBid={minBid} />
            <BattleHistoryDialog token={token} battles={battles} open={openedBattleHistoryDialog} handleClose={handleCloseBattleHistoryDialog} />
            <BattleResultDialog token={token} battle={battleResult} open={openedBattleResultDialog} handleClose={handleCloseBattleResultDialog} />

        </Fragment>

    )
}

export default Heroes;