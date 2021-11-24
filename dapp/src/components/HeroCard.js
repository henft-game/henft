import { Card, CardActions, CardContent, CardHeader, Grid, Typography, Button, Divider, LinearProgress, ButtonGroup } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles, styled } from '@mui/styles';
import React, { Fragment, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import Text from './Text';
import LazyLoad from 'react-lazyload';

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

export default function HeroCard({ heroInstance, token,
    isApprovedForAll, setBattleResult, openBattleResultDialog,
    openCreateAuctionDialog, openSellDialog, openConfirmMarketDialog,
    openBidDialog, openBattleHistoryDialog
}) {


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

    const { contract, accounts, market, web3, battleSystem } = useContext(Web3Context);

    const [auction, setAuction] = useState({ minValue: '0', currValue: '0', seller: '' });
    const [selling, setSelling] = useState({ value: '0', seller: '' });
    const [equipment, setEquipment] = useState();

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


    return (
        <LazyLoad offset={700} once placeholder={<div>loading...</div>}>
            <Fragment>
                <Card ref={myselfElementRef} className={classes.root}
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
                                        {!!hero?.tokenURI ?
                                            <img className={classes.nft} src={hero?.tokenURI} alt={`#${token}`} />
                                            :
                                            <img className={classes.nft} src={'/imgs/0.gif'} alt={`#${token}`} />
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
                                            {`Owner: ${hero?.owner}`}
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
                                        {hero?.owner === accounts[0] &&
                                            <ActionButton onClick={() => { battle() }} label="New" />
                                        }
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={12} md="auto">
                                    {(hero?.owner === accounts[0] || selling.seller === accounts[0] || auction.seller === accounts[0]) ?
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
                                                        <ActionButton onClick={() => { openBidDialog(token, (auction.currValue === '0' ? auction.minValue : (parseInt(auction.currValue) * 1.1) + '')) }} label="New Bid" />
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
        </LazyLoad>
    );
}