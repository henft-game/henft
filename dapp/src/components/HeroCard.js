import { Card, CardActions, CardContent, CardHeader, Grid, Typography, Button, Divider, LinearProgress, ButtonGroup } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles, styled } from '@mui/styles';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import Text from './Text';
import SellDialog from './SellDialog';
import CreateAuctionDialog from './CreateAuctionDialog';
import BidDialog from './BidDialog';
import ConfirmMarketDialog from './ConfirmMarketDialog';
import BattleHistoryDialog from './BattleHistoryDialog';
import BattleResultDialog from './BattleResultDialog';
import useHeroTokenURI from '../hooks/useHeroTokenURI';
import useHeroOwner from '../hooks/useHeroOwner';

export function ActionButton(props) {
    return (
        <Button size="small" {...props}
            sx={{
                background: '#DCC1A1', color: '#61422D',
                borderColor: '#61422D', borderRadius: '1',
                textTransform: 'capitalize',
                borderWidth: '2px',
                '&:hover': {
                    borderColor: '#61422D', borderRadius: '1',
                    borderWidth: '2px',
                }
            }}>
            {props.label}
        </Button>
    );
}

export default function HeroCard({ heroInstance, token, isApprovedForAll }) {


    const useStyles = makeStyles({
        nft: {
            marginRight: 5,
            width: '100%',
            height: '100%',
            borderRadius: 2,
        },
        item: {
            width: '100%',
            borderRadius: 2,
        },
        itemDiv: {
            position: 'relative',
            border: '1px solid #61422D',
            borderRadius: 2,
            padding: 5,
            "&:before": {
                position: 'absolute',
                content: '"Item"',
                fontSize: 9,
                top: -9,
                padding: 3,
                left: '50%',
                marginLeft: -19,
                width: 38,
                border: '1px solid #61422D',
                background: '#DCC1A1',
                borderRadius: 2,
            }
        },
        battle: {
            marginTop: 20,
            position: 'relative',
            display: 'flex',
            "&:before": {
                position: 'absolute',
                content: '"BATTLE"',
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
                content: '"MARKETPLACE"',
                fontSize: 9,
                top: -13,
                left: '50%',
                marginLeft: -45,
                width: 100,
            }
        }
    });

    const classes = useStyles();

    const StatusGrid = styled(Grid)(({ theme }) => ({

        "&&": {
            margin: '6px 0px 0px 0px',
            padding: 7,
            border: '1px solid #61422D',
            position: 'relative',
            borderRadius: 2,
        },
        [theme.breakpoints.down('sm')]: {
            "&&": {
                margin: '13px 0px 0px 7px',
            },
        },
        "&:before": {
            position: 'absolute',
            content: '"Hens Details"',
            fontSize: 12,
            top: -9,
            padding: 3,
            left: '50%',
            marginLeft: -72,
            width: 144,
            border: '1px solid #61422D',
            background: '#DCC1A1',
            borderRadius: 2,
        }
    }));

    const rarity = {
        '0': 'COMMON',
        '1': 'UNCOMMON',
        '2': 'RARE',
        '3': 'LEGENDARY',
    }

    const heroType = {
        '0': 'FIGHTER',
        '1': 'ROGUE',
        '2': 'MAGE',
        '3': 'TANK',
    }

    const { marketAddress, contract, accounts, market, web3, battleSystem } = useContext(Web3Context);

    const [auction, setAuction] = useState({ minValue: '0', currValue: '0', seller: '' });
    const [selling, setSelling] = useState({ value: '0', seller: '' });
    const [equipment, setEquipment] = useState();

    const [battles, setBattles] = useState([]);
    const [battleResult, setBattleResult] = useState();

    const [hero, setHero] = useState();

    const loadHero = async function () {
        setHero(await contract.methods.getHeroComplete(token).call({ from: accounts[0] }));
    }

    const loadAuction = async function () {
        setAuction(await market.methods.getAuction(token).call({ from: accounts[0] }));
    }

    const loadSelling = async function () {
        setSelling(await market.methods.getSelling(token).call({ from: accounts[0] }));
    }

    const disallowBuy = async function () {
        await market.methods.disallowBuy(token).send({ from: accounts[0] });
    }

    const buy = async function () {
        await market.methods.buy(token).send({ from: accounts[0], value: selling.value });
    }

    const cancelAuction = async function () {
        await market.methods.cancelAuction(token).send({ from: accounts[0] });
    }

    const finishAuction = async function () {
        await market.methods.finishAuction(token).send({ from: accounts[0] });
    }

    const battle = async function () {
        await battleSystem.methods.battle(token).send({ from: accounts[0], gas: '500000' });

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
        window.location.reload();
    }

    const allowBuy = async function (value) {
        await market.methods.allowBuy(token, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseSellDialog();
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
        openBattleResultDialog(token);
    }

    useEffect(() => {
        setHero(heroInstance);

        return () => {

        }
    }, [heroInstance]);

    useEffect(() => {
        if (token !== '' && !!contract && !!market && !!battleSystem && !!accounts) {

            console.log("mount: " + token);

            loadMarket();

            const subs = [];

            subs.push(contract.events.HeroLevelUp({ filter: { tokenId: token + '' } }, eventLoadHeroListener));
            subs.push(contract.events.NewCurrXP({ filter: { tokenId: token + '' } }, eventLoadHeroListener));

            subs.push(market.events.NewAuction({ filter: { tokenId: token + '' } }, eventListener));
            subs.push(market.events.CancelAuction({ filter: { tokenId: token + '' } }, eventListener));
            subs.push(market.events.NewSellingItem({ filter: { tokenId: token + '' } }, eventListener));
            subs.push(market.events.CancelSellingItem({ filter: { tokenId: token + '' } }, eventListener));
            subs.push(market.events.NewBid({ filter: { tokenId: token + '' } }, eventListener));
            subs.push(market.events.AuctionEnded({ filter: { tokenId: token + '' } }, eventListener));
            subs.push(market.events.ItemBought({ filter: { tokenId: token + '' } }, eventListener));

            subs.push(battleSystem.events.BattleEnd({ filter: { owner: accounts[0], aHeroId: token + '' } }, eventBattleResultListener));

            return () => {
                console.log("unmount: " + token);
                for (let index = 0; index < subs.length; index++) {
                    subs[index].unsubscribe();
                }
            }
        }
    }, [token, contract, market, battleSystem, accounts]);

    const { tokenURI } = useHeroTokenURI(token);
    const { owner } = useHeroOwner(token);

    const [minBid, setMinBid] = useState('0');
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

    const openBidDialog = (minBid) => {
        setMinBid(minBid);
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
        const ret = await battleSystem.methods.getBattles(token).call({ from: accounts[0] });
        setBattles([...ret].reverse());
        setOpenedBattleHistoryDialog(true);

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
            <Fragment>
                <Card className={classes.root}
                    sx={{
                        padding: '10px',
                        maxWidth: '700px',
                        background: '#FEEDD9',
                        border: '4px solid #61422D',
                        borderRadius: 1,

                    }}>
                    <CardHeader className={classes.header} sx={{ padding: "0", marginBottom: "3px" }}
                        title={`#${token} ${!!hero?.name ? ` - ${hero?.name}` : ''}`}
                        subheader={
                            <Fragment>
                                <Typography>Level {hero?.level} (XP:{hero?.currXP}/{Math.pow(2, parseInt(hero?.level))})</Typography>
                                <LinearProgress sx={{
                                    height: "10px",
                                    background: '#FEEDD9',
                                    border: "2px solid #61422D",
                                    borderRadius: "2px",
                                    [`& .${linearProgressClasses.bar}`]: {
                                        background: '#61422D'
                                    }
                                }}
                                    variant="determinate" value={hero?.currXP / Math.pow(2, parseInt(hero?.level)) * 100} />
                            </Fragment>
                        }
                    />

                    <CardContent className={classes.headerSubTitleDiv} sx={{ padding: "0", background: '#DCC1A1', borderRadius: "2px" }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container justify="flex-start" sx={{ color: '#61422D', padding: "7px" }}>
                                    <Grid item xs={12} md={6} sx={{ paddingRight: "7px" }}>
                                        {!!tokenURI ?
                                            <img className={classes.nft} src={tokenURI} alt={`#${token}`} />
                                            :
                                            <img className={classes.nft} src="imgs/new_hen.gif" alt={`#${token}`} />
                                        }
                                    </Grid>
                                    <StatusGrid item xs={12} md={6}>
                                        <Grid item sx={{ marginTop: "7px", marginBottom: "7px" }}>
                                            <Text label="Rarity" value={rarity[hero?.rarity]} />
                                            <Text label="Type" value={heroType[hero?.heroType]} />
                                        </Grid>
                                        <Divider />
                                        <Grid container sx={{ marginTop: "7px" }}>
                                            <Grid item xs>
                                                <Typography sx={{ fontSize: "13px" }}>{`STR:${hero?.str}`}</Typography>
                                                <Typography sx={{ fontSize: "13px" }}>{`CON:${hero?.con}`}</Typography>
                                                <Typography sx={{ fontSize: "13px" }}>{`DEX:${hero?.dex}`}</Typography>
                                                <Typography sx={{ fontSize: "13px" }}>{`WIS:${hero?.wis}`}</Typography>
                                            </Grid>
                                            {!!equipment &&
                                                <Grid item xs>
                                                    <div className={classes.itemDiv}>
                                                        <img className={classes.item} src="./imgs/item_placeholder.gif" alt="item" />
                                                    </div>
                                                </Grid>
                                            }
                                        </Grid>
                                    </StatusGrid>
                                    <Grid item xs={12}>
                                        <Typography sx={{
                                            fontSize: "7px", paddingTop: "4px", textAlign: "right", color: "#61422D"
                                        }}>
                                            {`Owner: ${owner}`}
                                        </Typography>
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
                                        <ActionButton onClick={() => { openBattleHistoryDialog(token) }} label="History" />
                                        {owner === accounts[0] &&
                                            <ActionButton onClick={() => { battle() }} label="New" />
                                        }
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={12} md="auto">
                                    {(owner === accounts[0] || selling.seller === accounts[0] || auction.seller === accounts[0]) ?
                                        <ButtonGroup size="small" aria-label="small button group" className={classes.market}>
                                            {auction.minValue === '0' && selling.value === '0' &&
                                                <Fragment>
                                                    <ActionButton onClick={() => { isApprovedForAll ? openSellDialog(token) : openConfirmMarketDialog() }} label="Sell" />
                                                    <ActionButton onClick={() => { isApprovedForAll ? openCreateAuctionDialog(token) : openConfirmMarketDialog() }} label="Auction" />
                                                </Fragment>
                                            }
                                            {selling.value !== '0' &&
                                                <ActionButton onClick={() => { disallowBuy() }} label="Cancel Sell" />
                                            }
                                            {auction.minValue !== '0' && auction.currValue === '0' &&
                                                <ActionButton onClick={() => { cancelAuction() }} label="Cancel Auction" />
                                            }
                                            {auction.minValue !== '0' && auction.currValue !== '0' &&
                                                <ActionButton label={`Curr. Value  ${web3.utils.fromWei(auction.currValue, 'ether')}`} />
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
                                                        <ActionButton onClick={() => { openBidDialog((auction.currValue === '0' ? auction.minValue : (parseInt(auction.currValue) * 1.1) + '')) }} label="New Bid" />
                                                    }
                                                    {auction.minValue !== '0' && selling.value === '0' && auction.endTime < new Date().getTime() &&
                                                        <ActionButton onClick={() => { finishAuction() }} label="Finish Auction" />
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
            </Fragment>
            <ConfirmMarketDialog open={openedConfirmMarketDialog} handleClose={handleCloseConfirmMarketDialog} setApprovalForAll={setApprovalForAll} />
            <SellDialog token={token} open={openedSellDialog} handleClose={handleCloseSellDialog} allowBuy={allowBuy} />
            <CreateAuctionDialog token={token} open={openedCreateAuctionDialog} handleClose={handleCloseCreateAuctionDialog} createAuction={createAuction} />
            <BidDialog token={token} open={openedBidDialog} handleClose={handleCloseBidDialog} bid={bid} minBid={minBid} />
            <BattleHistoryDialog token={token} battles={battles} open={openedBattleHistoryDialog} handleClose={handleCloseBattleHistoryDialog} />
            <BattleResultDialog token={token} battle={battleResult} open={openedBattleResultDialog} handleClose={handleCloseBattleResultDialog} />
        </Fragment>
    );
}