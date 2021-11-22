import { Card, CardActions, CardContent, CardHeader, Grid, Typography, Button, Divider, LinearProgress, ButtonGroup } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';
import React, { Fragment, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import Text from './Text';
import SellDialog from './SellDialog';
import CreateAuctionDialog from './CreateAuctionDialog';
import BidDialog from './BidDialog';
import ConfirmMarketDialog from './ConfirmMarketDialog';
import BattleHistoryDialog from './BattleHistoryDialog';
import BattleResultDialog from './BattleResultDialog';

export function ActionButton(props) {
    return (
        <Button size="small" {...props} sx={{ background: "#DDD", color: "#000", borderColor: "#000", borderRadius: "0" }}>{props.label}</Button>
    );
}

export default function HeroCard({ heroInstance, token, isApprovalForAll, isApprovedForAll }) {


    const useStyles = makeStyles({
        root: {
            boxShadow: '2px 2px 5px 0 rgb(0,0,0,75%)',
            borderRadius: 0,
            padding: 10,
            maxWidth: 700
        },
        nft: {
            marginRight: 5,
            width: '100%',
            height: '100%',
        },
        status: {
            padding: 10,
        },
        battle: {
            marginTop: 20,
            position: 'relative',
            display: 'flex',
            "&:before": {
                position: 'absolute',
                content: '"Battle"',
                fontSize: 9,
                top: -13,
                left: '50%',
                marginLeft: -25,
                width: 55,
            }
        },
        market: {
            marginTop: 20,
            position: 'relative',
            display: 'flex',
            "&:before": {
                position: 'absolute',
                content: '"Marketplace"',
                fontSize: 9,
                top: -13,
                left: '50%',
                marginLeft: -45,
                width: 100,
            }
        }
    });

    const classes = useStyles();

    const rarity = {
        '0': 'COMMON',
        '1': 'UNCOMMON',
        '2': 'RARE',
        '3': 'LEGENDARY',
    }

    const rarityColors = {
        '0': '#747474',
        '1': '#7a92a6',
        '2': '#d1d186',
        '3': '#e1ad79',
    }

    const rarityColors2 = {
        '0': '#8c8c8c',
        '1': '#85a1b6',
        '2': '#e4e493',
        '3': '#f2ba83',
    }

    const heroType = {
        '0': 'FIGHTER',
        '1': 'ROGUE',
        '2': 'MAGE',
        '3': 'TANK',
    }

    const { contract, accounts, market, web3, marketAddress, battleSystem } = useContext(Web3Context);

    const [auction, setAuction] = useState({ minValue: '0', currValue: '0', seller: '' });
    const [selling, setSelling] = useState({ value: '0', seller: '' });

    const [hero, setHero] = useState();
    const [battles, setBattles] = useState([]);
    const [battleResult, setBattleResult] = useState();

    const loadHero = async function () {
        setHero(await contract.methods.getHeroComplete(token).call({ from: accounts[0] }));
    }

    const loadAuction = async function () {
        setAuction(await market.methods.getAuction(token).call({ from: accounts[0] }));
    }

    const loadSelling = async function () {
        setSelling(await market.methods.getSelling(token).call({ from: accounts[0] }));
    }

    const allowBuy = async function (value) {
        await market.methods.allowBuy(token, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseSellDialog();
    }

    const disallowBuy = async function () {
        await market.methods.disallowBuy(token).send({ from: accounts[0] });
    }

    const setApprovalForAll = async function () {
        await contract.methods.setApprovalForAll(marketAddress, true).send({ from: accounts[0] });
        handleCloseConfirmMarketDialog();
        isApprovalForAll();
    }

    const buy = async function () {
        await market.methods.buy(token).send({ from: accounts[0], value: selling.value });
    }

    const bid = async function (value) {
        await market.methods.bid(token).send({ from: accounts[0], value: web3.utils.toWei(value) });
        handleCloseBidDialog();
    }

    const createAuction = async function (auctionEnd, value) {
        await market.methods.createAuction(token, auctionEnd, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseCreateAuctionDialog();
    }

    const cancelAuction = async function () {
        await market.methods.cancelAuction(token).send({ from: accounts[0] });
    }

    const finishAuction = async function () {
        await market.methods.finishAuction(token).send({ from: accounts[0] });
    }

    const battle = async function () {
        await battleSystem.methods.battle(token).send({ from: accounts[0] });

    }

    const loadMarket = async function () {
        await loadAuction();
        await loadSelling();
    }

    const eventListener = function (err, event) {
        loadMarket();
        loadHero();
    }

    const eventLoadHeroListener = function (err, event) {
        loadHero();
    }

    const eventBattleResultListener = function (err, event) {
        setBattleResult(event.returnValues);
        openBattleResultDialog();
    }

    useEffect(() => {
        setHero(heroInstance);
    }, [heroInstance]);


    const observer = useRef();
    const myselfElementRef = useCallback(node => {
        if (token !== '' && !!contract && !!market && !!battleSystem && !!accounts) {
            if (observer.current) {
                observer.current.disconnect();
            }
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {

                    loadMarket();

                    contract.events.HeroLevelUp({ filter: { tokenId: token + '' } }, eventLoadHeroListener);
                    contract.events.NewCurrXP({ filter: { tokenId: token + '' } }, eventLoadHeroListener);

                    market.events.NewAuction({ filter: { tokenId: token + '' } }, eventListener);
                    market.events.CancelAuction({ filter: { tokenId: token + '' } }, eventListener);
                    market.events.NewSellingItem({ filter: { tokenId: token + '' } }, eventListener);
                    market.events.CancelSellingItem({ filter: { tokenId: token + '' } }, eventListener);
                    market.events.NewBid({ filter: { tokenId: token + '' } }, eventListener);
                    market.events.AuctionEnded({ filter: { tokenId: token + '' } }, eventListener);
                    market.events.ItemBought({ filter: { tokenId: token + '' } }, eventListener);

                    battleSystem.events.BattleEnd({ filter: { owner: accounts[0], aHeroId: token + '' } }, eventBattleResultListener);
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        }
    }, [token, contract, market, battleSystem, accounts]);


    const [openedSellDialog, setOpenedSellDialog] = useState(false);

    const openSellDialog = () => {
        setOpenedSellDialog(true);
    }

    const handleCloseSellDialog = () => {
        setOpenedSellDialog(false);
    }

    const [openedCreateAuctionDialog, setOpenedCreateAuctionDialog] = useState(false);

    const openCreateAuctionDialog = () => {
        setOpenedCreateAuctionDialog(true);
    }

    const handleCloseCreateAuctionDialog = () => {
        setOpenedCreateAuctionDialog(false);
    }

    const [openedBidDialog, setOpenedBidDialog] = useState(false);

    const openBidDialog = () => {
        setOpenedBidDialog(true);
    }

    const handleCloseBidDialog = () => {
        setOpenedBidDialog(false);
    }

    const [openedConfirmMarketDialog, setOpenedConfirmMarketDialog] = useState(false);

    const openConfirmMarketDialog = () => {
        setOpenedConfirmMarketDialog(true);
    }

    const handleCloseConfirmMarketDialog = () => {
        setOpenedConfirmMarketDialog(false);
    }

    const [openedBattleHistoryDialog, setOpenedBattleHistoryDialog] = useState(false);

    const openBattleHistoryDialog = async () => {
        setOpenedBattleHistoryDialog(true);
        const ret = await battleSystem.methods.getBattles(token).call({ from: accounts[0] });
        setBattles([...ret].reverse());

    }

    const handleCloseBattleHistoryDialog = () => {
        setOpenedBattleHistoryDialog(false);
    }

    const [openedBattleResultDialog, setOpenedBattleResultDialog] = useState(false);

    const openBattleResultDialog = async () => {
        setOpenedBattleResultDialog(true);

    }

    const handleCloseBattleResultDialog = () => {
        setOpenedBattleResultDialog(false);
    }

    return (
        <Fragment>
            {!!hero &&
                <Fragment>
                    <Card ref={myselfElementRef} className={classes.root} sx={{ padding: "0", background: rarityColors2[hero.rarity] }}>
                        <CardHeader className={classes.header} sx={{ padding: "1px" }}
                            title={`#${token} ${!!hero.name ? ` - ${hero.name}` : ''}`}
                            subheader={
                                <Fragment>
                                    <Typography>Level {hero.level} (XP:{hero.currXP}/{Math.pow(2, parseInt(hero.level))})</Typography>
                                    <LinearProgress sx={{
                                        height: "10px",
                                        background: rarityColors2[hero.rarity],
                                        border: "2px solid",
                                        borderColor: rarityColors[hero.rarity],
                                        [`& .${linearProgressClasses.bar}`]: {
                                            background: rarityColors[hero.rarity]
                                        }
                                    }}
                                        variant="determinate" value={hero.currXP / Math.pow(2, parseInt(hero.level)) * 100} />
                                </Fragment>
                            }
                        />

                        <CardContent className={classes.headerSubTitleDiv} sx={{ padding: "1px" }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start">
                                        <Grid item xs={12} md={6}>
                                            {!!hero.tokenURI ?
                                                <img className={classes.nft} src={hero.tokenURI} alt={`#${token}`} />
                                                :
                                                <img className={classes.nft} src={'/imgs/0.gif'} alt={`#${token}`} />
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6} lg className={classes.status} sx={{ background: rarityColors[hero.rarity] }}>
                                            <Grid item sx={{ marginBottom: "10px" }}>
                                                <Typography sx={{ textAlign: "center", fontSize: "20px" }}>Basic Info</Typography>
                                            </Grid>
                                            <Divider />
                                            <Grid item sx={{ marginTop: "10px", marginBottom: "10px" }}>
                                                <Text label="Rarity" value={rarity[hero.rarity]} />
                                                <Text label="Type" value={heroType[hero.heroType]} />
                                            </Grid>
                                            <Divider />
                                            <Grid item sx={{ marginTop: "10px" }}>
                                                <Text label="STR" value={hero.str} />
                                                <Text label="CON" value={hero.con} />
                                                <Text label="DEX" value={hero.dex} />
                                                <Text label="WIS" value={hero.wis} />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography sx={{ fontSize: "7px", paddingTop: "4px", textAlign: "right", color: "#444" }}>{`Owner: ${hero.owner}`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </CardContent>

                        <CardActions sx={{ minHeight: "31px", padding: "4px" }}>
                            {!!accounts && !!accounts[0] &&
                                <Grid container>
                                    <Grid item xs={12} md="auto" sx={{ marginRight: "4px" }}>
                                        <ButtonGroup size="small" aria-label="small button group" className={classes.battle}>
                                            <ActionButton onClick={() => { openBattleHistoryDialog() }} label="HISTORY" />
                                            {hero.owner === accounts[0] &&
                                                <ActionButton onClick={() => { battle() }} label="NEW" />
                                            }
                                        </ButtonGroup>
                                    </Grid>
                                    <Grid item xs={12} md="auto">
                                        {(hero.owner === accounts[0] || selling.seller === accounts[0] || auction.seller === accounts[0]) ?
                                            <ButtonGroup size="small" aria-label="small button group" className={classes.market}>
                                                {auction.minValue === '0' && selling.value === '0' &&
                                                    <Fragment>
                                                        <ActionButton onClick={() => { isApprovedForAll ? openSellDialog() : openConfirmMarketDialog() }} label="SELL" />
                                                        <ActionButton onClick={() => { isApprovedForAll ? openCreateAuctionDialog() : openConfirmMarketDialog() }} label="AUCTION" />
                                                    </Fragment>
                                                }
                                                {selling.value !== '0' &&
                                                    <ActionButton onClick={() => { disallowBuy() }} label="CANCEL SELL" />
                                                }
                                                {auction.minValue !== '0' && auction.currValue === '0' &&
                                                    <ActionButton onClick={() => { cancelAuction() }} label="CANCEL AUCTION" />
                                                }
                                                {auction.minValue !== '0' && auction.currValue !== '0' &&
                                                    <ActionButton label={`CURR VALUE  ${web3.utils.fromWei(auction.currValue, 'ether')}`} />
                                                }
                                            </ButtonGroup>
                                            :
                                            <Fragment>
                                                {(auction.minValue !== '0' || selling.value !== '0') &&
                                                    <ButtonGroup size="small" aria-label="small button group" className={classes.market}>
                                                        {auction.minValue === '0' && selling.value !== '0' &&
                                                            <ActionButton onClick={() => { buy() }} label={`BUY ${web3.utils.fromWei(selling.value, 'ether')}`} />
                                                        }
                                                        {auction.minValue !== '0' && selling.value === '0' && auction.endTime >= new Date().getTime() &&
                                                            <ActionButton onClick={() => { openBidDialog() }} label="NEW BID" />
                                                        }
                                                        {auction.minValue !== '0' && selling.value === '0' && auction.endTime < new Date().getTime() &&
                                                            <ActionButton onClick={() => { finishAuction() }} label="FINISH AUCTION" />
                                                        }
                                                    </ButtonGroup>
                                                }
                                            </Fragment>
                                        }
                                    </Grid>
                                </Grid>
                            }
                        </CardActions>
                    </Card>
                    <ConfirmMarketDialog open={openedConfirmMarketDialog} handleClose={handleCloseConfirmMarketDialog} setApprovalForAll={setApprovalForAll} />
                    <SellDialog token={token} open={openedSellDialog} handleClose={handleCloseSellDialog} allowBuy={allowBuy} />
                    <CreateAuctionDialog token={token} open={openedCreateAuctionDialog} handleClose={handleCloseCreateAuctionDialog} createAuction={createAuction} />
                    <BidDialog token={token} open={openedBidDialog} handleClose={handleCloseBidDialog} bid={bid} minBid={auction.currValue === '0' ? auction.minValue : (parseInt(auction.currValue) * 1.1) + ''} />
                    <BattleHistoryDialog token={token} battles={battles} open={openedBattleHistoryDialog} handleClose={handleCloseBattleHistoryDialog} />
                    <BattleResultDialog token={token} battle={battleResult} open={openedBattleResultDialog} handleClose={handleCloseBattleResultDialog} />
                </Fragment>
            }
        </Fragment>
    );
}