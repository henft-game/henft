import { Card, CardActions, CardContent, CardHeader, Grid, Typography, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import Text from './Text';
import SellDialog from './SellDialog';
import CreateAuctionDialog from './CreateAuctionDialog';
import BidDialog from './BidDialog';
import ConfirmMarketDialog from './ConfirmMarketDialog';

export default function HeroCard({ hero, token, levelUp, isApprovalForAll, isApprovedForAll }) {


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

    const { contract, accounts, market, web3, marketAddress } = useContext(Web3Context);

    const [auction, setAuction] = useState({ minValue: '0', currValue: '0', seller: '' });
    const [selling, setSelling] = useState({ value: '0', seller: '' });
    const [owner, setOwner] = useState('');
    const [tokenURI, setTokenURI] = useState('');

    const loadAuction = async function () {
        setAuction(await market.methods.getAuction(token).call({ from: accounts[0] }));
    }

    const loadSelling = async function () {
        setSelling(await market.methods.getSelling(token).call({ from: accounts[0] }));
    }

    const allowBuy = async function (value) {
        await market.methods.allowBuy(token, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseSellDialog();
        reload();
    }

    const disallowBuy = async function () {
        await market.methods.disallowBuy(token).send({ from: accounts[0] });
        reload();
    }

    const loadOwner = async function () {
        setOwner(await contract.methods.ownerOf(token).call({ from: accounts[0] }));
    }

    const loadTokenURI = async function () {
        setTokenURI(await contract.methods.tokenURI(token).call({ from: accounts[0] }));
    }

    const setApprovalForAll = async function () {
        await contract.methods.setApprovalForAll(marketAddress, true).send({ from: accounts[0] });
        handleCloseConfirmMarketDialog();
        isApprovalForAll();
    }

    const buy = async function () {
        await market.methods.buy(token).send({ from: accounts[0], value: selling.value });
        reload();
    }

    const bid = async function (value) {
        await market.methods.bid(token).send({ from: accounts[0], value: web3.utils.toWei(value) });
        handleCloseBidDialog();
        reload();
    }

    const createAuction = async function (auctionEnd, value) {
        await market.methods.createAuction(token, auctionEnd, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseCreateAuctionDialog();
        reload();
    }

    const cancelAuction = async function () {
        await market.methods.cancelAuction(token).send({ from: accounts[0] });
        reload();
    }

    const finishAuction = async function () {
        await market.methods.finishAuction(token).send({ from: accounts[0] });
        reload();
    }


    const reload = async function () {
        await loadAuction();
        await loadSelling();
        await loadOwner();
    }

    useEffect(() => {
        reload();
        loadTokenURI();
    }, [contract, accounts, token]);

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

    return (
        <Fragment>
            <Card className={classes.root} sx={{ padding: "0", background: rarityColors2[hero.rarity] }}>

                <CardHeader className={classes.header} sx={{ padding: "10px" }} title={`#${token} ${!!hero.name ? ` - ${hero.name}` : ''}`} subheader={`Level: ${hero.level}`} />

                <CardContent className={classes.headerSubTitleDiv} sx={{ padding: "1px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container justify="flex-start">
                                <Grid item xs={12} md={6}>
                                    {!!tokenURI ?
                                        <img className={classes.nft} src={tokenURI} alt={`#${token}`} />
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
                                        <Text label="WIS" value={hero.inte} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Typography sx={{ fontSize: "9px", padding: "5px" }}>{`Owner: ${owner}`}</Typography>
                        </Grid>
                    </Grid>

                </CardContent>

                <CardActions>
                    {!!accounts && (owner === accounts[0] || selling.seller === accounts[0] || auction.seller === accounts[0]) ?
                        <Fragment>
                            <Button size="small" onClick={() => { levelUp(token) }} sx={{ background: "#DDD", color: "#000" }}>LVL UP</Button>
                            {auction.minValue === '0' && selling.value === '0' &&
                                <Fragment>
                                    <Button size="small" onClick={() => { isApprovedForAll ? openSellDialog() : openConfirmMarketDialog() }} sx={{ background: "#DDD", color: "#000" }}>SELL</Button>
                                    <Button size="small" onClick={() => { isApprovedForAll ? openCreateAuctionDialog() : openConfirmMarketDialog() }} sx={{ background: "#DDD", color: "#000" }}>AUCTION</Button>
                                </Fragment>
                            }
                            {selling.value !== '0' &&
                                <Button size="small" onClick={() => { disallowBuy() }} sx={{ background: "#DDD", color: "#000" }}>CANCEL SELL</Button>
                            }
                            {auction.minValue !== '0' && auction.currValue === '0' &&
                                <Button size="small" onClick={() => { cancelAuction() }} sx={{ background: "#DDD", color: "#000" }}>CANCEL AUCTION</Button>
                            }
                        </Fragment>
                        :
                        <Fragment>
                            {auction.minValue === '0' && selling.value !== '0' &&
                                <Button size="small" onClick={() => { buy() }} sx={{ background: "#DDD", color: "#000" }}>BUY {web3.utils.fromWei(selling.value, 'ether')}</Button>
                            }
                            {auction.minValue !== '0' && selling.value === '0' && auction.endTime >= new Date().getTime() &&
                                <Button size="small" onClick={() => { openBidDialog() }} sx={{ background: "#DDD", color: "#000" }}>BID</Button>
                            }
                            {auction.minValue !== '0' && selling.value === '0' && auction.endTime < new Date().getTime() &&
                                <Button size="small" onClick={() => { finishAuction() }} sx={{ background: "#DDD", color: "#000" }}>FINISH AUCTION</Button>
                            }
                        </Fragment>
                    }
                </CardActions>
            </Card>
            <ConfirmMarketDialog open={openedConfirmMarketDialog} handleClose={handleCloseConfirmMarketDialog} setApprovalForAll={setApprovalForAll} />
            <SellDialog token={token} open={openedSellDialog} handleClose={handleCloseSellDialog} allowBuy={allowBuy} />
            <CreateAuctionDialog token={token} open={openedCreateAuctionDialog} handleClose={handleCloseCreateAuctionDialog} createAuction={createAuction} />
            <BidDialog token={token} open={openedBidDialog} handleClose={handleCloseBidDialog} bid={bid} minBid={auction.currValue === '0' ? auction.minValue : (parseInt(auction.currValue) * 1.1) + ''} />
        </Fragment>
    );
}