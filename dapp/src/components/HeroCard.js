import { CardContent, CardHeader, Grid, Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { makeStyles } from '@mui/styles';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import Text from './Text';
import SellDialog from './SellDialog';
import CreateAuctionDialog from './CreateAuctionDialog';
import BidDialog from './BidDialog';

export default function HeroCard({ hero, token, levelUp }) {


    const useStyles = makeStyles({
        root: {
            boxShadow: '2px 2px 5px 0 rgb(0,0,0,75%)',
            borderRadius: 0,
            padding: 10,
            background: '#CCCCCC',
            border: 1,
            borderStyle: 'solid',
            borderColor: '#AAAAAA',
            maxWidth: 700
        },
        nft: {
            marginRight: 5,
            width: '100%',
            height: '100%',
        },
        status: {
            background: '#EEEEEE',
            padding: 10,
        },
        common: {
            color: "#747474",
        },
        uncommon: {
            color: "#85a1b6",
        },
        rare: {
            color: "#e4e493",
        },
        legendary: {
            color: "#f2ba83",
        },
    });

    const classes = useStyles();

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

    const { contract, accounts, web3 } = useContext(Web3Context);

    const [auction, setAuction] = useState({ minValue: '0', currValue: '0' });
    const [selling, setSelling] = useState('0');
    const [owner, setOwner] = useState('');

    const loadAuction = async function () {
        setAuction(await contract.methods.getAuction(token).call({ from: accounts[0] }));
    }

    const loadSelling = async function () {
        setSelling(await contract.methods.getSelling(token).call({ from: accounts[0] }));
    }

    const allowBuy = async function (value) {
        await contract.methods.allowBuy(token, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseSellDialog();
        reload();
    }

    const disallowBuy = async function () {
        await contract.methods.disallowBuy(token).send({ from: accounts[0] });
        reload();
    }

    const loadOwner = async function () {
        setOwner(await contract.methods.ownerOf(token).call({ from: accounts[0] }));
    }

    const buy = async function () {
        await contract.methods.buy(token).send({ from: accounts[0], value: selling });
        reload();
    }

    const bid = async function (value) {
        await contract.methods.bid(token).send({ from: accounts[0], value: web3.utils.toWei(value) });
        handleCloseBidDialog();
        reload();
    }

    const createAuction = async function (auctionEnd, value) {
        await contract.methods.createAuction(token, auctionEnd, web3.utils.toWei(value)).send({ from: accounts[0] });
        handleCloseCreateAuctionDialog();
        reload();
    }

    const cancelAuction = async function () {
        await contract.methods.cancelAuction(token).send({ from: accounts[0] });
        reload();
    }

    const finishAuction = async function () {
        await contract.methods.finishAuction(token).send({ from: accounts[0] });
        reload();
    }


    const reload = async function () {
        loadAuction();
        loadSelling();
        loadOwner();
    }

    useEffect(() => {
        loadAuction();
        loadSelling();
        loadOwner();
    }, [token]);


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

    return (
        <Fragment>
            <Card className={classes.root} sx={{ padding: "0" }}>

                <CardHeader className={classes.header} sx={{ padding: "10px" }} title={`#${token} ${!!hero.name ? ` - ${hero.name}` : ''}`} subheader={`Level: ${hero.level}`} />

                <CardContent className={classes.headerSubTitleDiv} sx={{ padding: "1px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container justify="flex-start">
                                <Grid item xs={12} md={6}>
                                    <img className={classes.nft} src={`/imgs/common_warrior.gif`} alt={`#${token}`} />
                                </Grid>
                                <Grid item xs={12} md={6} lg className={classes.status}>
                                    <Grid item>
                                        <Text label="Rarity" value={rarity[hero.rarity]} />
                                        <Text label="Type" value={heroType[hero.heroType]} />
                                    </Grid>
                                    <Grid item sx={{ marginTop: "20px" }}>
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
                    {!!accounts && accounts[0] === owner ?
                        <Fragment>
                            <Button size="small" onClick={() => { levelUp(token) }} sx={{ background: "#EEEEEE" }}>LVL UP</Button>
                            {auction.minValue === '0' && selling === '0' &&
                                <Fragment>
                                    <Button size="small" onClick={() => { openSellDialog() }} sx={{ background: "#EEEEEE" }}>SELL</Button>
                                    <Button size="small" onClick={() => { openCreateAuctionDialog() }} sx={{ background: "#EEEEEE" }}>AUCTION</Button>
                                </Fragment>
                            }
                            {selling !== '0' &&
                                <Button size="small" onClick={() => { disallowBuy() }} sx={{ background: "#EEEEEE" }}>CANCEL SELL</Button>
                            }
                            {auction.minValue !== '0' && auction.currValue === '0' &&
                                <Button size="small" onClick={() => { cancelAuction() }} sx={{ background: "#EEEEEE" }}>CANCEL AUCTION</Button>
                            }
                        </Fragment>
                        :
                        <Fragment>
                            {auction.minValue === '0' && selling !== '0' &&
                                <Button size="small" onClick={() => { buy() }} sx={{ background: "#EEEEEE" }}>BUY {web3.utils.fromWei(selling, 'ether')}</Button>
                            }
                            {auction.minValue !== '0' && selling === '0' && auction.endTime >= new Date().getTime() &&
                                <Button size="small" onClick={() => { openBidDialog() }} sx={{ background: "#EEEEEE" }}>BID</Button>
                            }
                            {auction.minValue !== '0' && selling === '0' && auction.endTime < new Date().getTime() &&
                                <Button size="small" onClick={() => { finishAuction() }} sx={{ background: "#EEEEEE" }}>FINISH AUCTION</Button>
                            }
                        </Fragment>
                    }
                </CardActions>
            </Card>
            <SellDialog token={token} open={openedSellDialog} handleClose={handleCloseSellDialog} allowBuy={allowBuy} />
            <CreateAuctionDialog token={token} open={openedCreateAuctionDialog} handleClose={handleCloseCreateAuctionDialog} createAuction={createAuction} />
            <BidDialog token={token} open={openedBidDialog} handleClose={handleCloseBidDialog} bid={bid} minBid={auction.currValue === '0' ? auction.minValue : (parseInt(auction.currValue) * 1.1) + ''} />
        </Fragment>
    );
}