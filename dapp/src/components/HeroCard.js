import { Card, CardActions, CardContent, CardHeader, Grid, Typography, Button, Divider, LinearProgress, ButtonGroup } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles, styled } from '@mui/styles';
import React, { Fragment, useContext, useState, useCallback } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import Text from './Text';
import SellDialog from './SellDialog';
import CreateAuctionDialog from './CreateAuctionDialog';
import BidDialog from './BidDialog';
import ConfirmMarketDialog from './ConfirmMarketDialog';
import BattleHistoryDialog from './BattleHistoryDialog';
import BattleResultDialog from './BattleResultDialog';
import useBattleSystemListener from '../hooks/useBattleSystemListener';
import useHeroDetails from '../hooks/useHeroDetails';
import useHeroTokenURI from '../hooks/useHeroTokenURI';
import { event } from '../services/tracking';

const HeroCard = ({ heroInstance, token, isApprovedForAll }) => {


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

    const ActionButton = styled(Button)(({ theme }) => ({

        "&&": {
            background: '#DCC1A1',
            color: '#61422D',
            borderColor: '#61422D',
            borderRadius: '1',
            textTransform: 'capitalize',
            borderWidth: '2px',
        },
        '&&:hover': {
            borderColor: '#61422D', borderRadius: '1',
            borderWidth: '2px',
        }
    }));

    const NftGrid = styled(Grid)(({ theme }) => ({

        "&&": {
            paddingRight: "7px",
        },
        [theme.breakpoints.down('sm')]: {
            "&&": {
                paddingRight: "0px",
            },
        },
    }));

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
                margin: '13px 0px 0px 0px',
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

    const { data } = useContext(Web3Context);

    const [equipment, setEquipment] = useState();

    const [battles, setBattles] = useState([]);
    const [battleResult, setBattleResult] = useState();

    const disallowBuy = async function () {
        await data?.market.methods.disallowBuy(token).send({ from: data?.accounts[0] });
        event({
            category: 'Marketplace',
            action: `Cancel Selling #${token}`,
        });
    }

    const buy = async function () {
        await data?.market.methods.buy(token).send({ from: data?.accounts[0], value: heroDetail?.selling?.value });
        event({
            category: 'Marketplace',
            action: `Buy #${token}: ${parseFloat(data?.web3.utils.fromWei(heroDetail?.selling?.value))}`,
        });
    }

    const cancelAuction = async function () {
        await data?.market.methods.cancelAuction(token).send({ from: data?.accounts[0] });
        event({
            category: 'Marketplace',
            action: `Cancel Auction #${token}`,
        });
    }

    const finishAuction = async function () {
        await data?.market.methods.finishAuction(token).send({ from: data?.accounts[0] });
        event({
            category: 'Marketplace',
            action: `Finish Auction #${token}`,
        });
    }

    const battle = async function () {
        await data?.battleSystem.methods.battle(token).send({ from: data?.accounts[0], gas: '500000' });
        event({
            category: 'Battle System',
            action: `New Battle #${token}`,
        });

    }

    const bid = async function (value) {
        await data?.market.methods.bid(token).send({ from: data?.accounts[0], value: data?.web3.utils.toWei(value) });
        event({
            category: 'Marketplace',
            action: `New Bid #${token}: ${parseFloat(value)}`,
        });

        handleCloseBidDialog();
    }

    const createAuction = async function (auctionEnd, value) {
        await data?.market.methods.createAuction(token, auctionEnd, data?.web3.utils.toWei(value)).send({ from: data?.accounts[0] });
        event({
            category: 'Marketplace',
            action: `New Auction #${token}`,
        });
        handleCloseCreateAuctionDialog();
    }

    const setApprovalForAll = async function () {
        await data?.contract.methods.setApprovalForAll(data?.marketAddress, true).send({ from: data?.accounts[0] });
        window.location.reload();
    }

    const allowBuy = async function (value) {
        await data?.market.methods.allowBuy(token, data?.web3.utils.toWei(value)).send({ from: data?.accounts[0] });
        event({
            category: 'Marketplace',
            action: `New Selling #${token}: ${parseFloat(value)}`,
        });
        handleCloseSellDialog();
    }

    const eventBattleListener = useCallback((err, event) => {
        setBattleResult((event).returnValues);
        openBattleResultDialog(token);
    }, [token]);

    const getHero = function () {
        if (!!hero) {
            return hero;
        }
        return heroInstance;
    }

    const { hero } = useBattleSystemListener(token, eventBattleListener);
    const { heroDetail } = useHeroDetails(token);
    const { tokenURI } = useHeroTokenURI(token);


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
        const ret = await data?.battleSystem.methods.getBattles(token).call();
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
                        title={`#${token} ${!!getHero().name ? ` - ${getHero().name}` : ''}`}
                        subheader={
                            <Fragment>
                                <Typography>Level {getHero().level} (XP:{getHero().currXP}/{Math.pow(2, parseInt(getHero().level))})</Typography>
                                <LinearProgress sx={{
                                    height: "10px",
                                    background: '#FEEDD9',
                                    border: "2px solid #61422D",
                                    borderRadius: "2px",
                                    [`& .${linearProgressClasses.bar}`]: {
                                        background: '#61422D'
                                    }
                                }}
                                    variant="determinate" value={getHero().currXP / Math.pow(2, parseInt(getHero().level)) * 100} />
                            </Fragment>
                        }
                    />

                    <CardContent className={classes.headerSubTitleDiv} sx={{ padding: "0", background: '#DCC1A1', borderRadius: "2px" }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container justify="flex-start" sx={{ color: '#61422D', padding: "7px" }}>
                                    <NftGrid item xs={12} md={6}>
                                        {!!tokenURI ?
                                            <img className={classes.nft} src={tokenURI} alt={`#${token}`} />
                                            :
                                            <img className={classes.nft} src="imgs/new_hen.gif" alt={`#${token}`} />
                                        }
                                    </NftGrid>
                                    <StatusGrid item xs={12} md={6}>
                                        <Grid item sx={{ marginTop: "7px", marginBottom: "7px" }}>
                                            <Text label="Rarity" value={rarity[getHero().rarity]} />
                                            <Text label="Type" value={heroType[getHero().heroType]} />
                                        </Grid>
                                        <Divider />
                                        <Grid container sx={{ marginTop: "7px" }}>
                                            <Grid item xs>
                                                <Typography sx={{ fontSize: "13px" }}>{`STR:${getHero().str}`}</Typography>
                                                <Typography sx={{ fontSize: "13px" }}>{`CON:${getHero().con}`}</Typography>
                                                <Typography sx={{ fontSize: "13px" }}>{`DEX:${getHero().dex}`}</Typography>
                                                <Typography sx={{ fontSize: "13px" }}>{`WIS:${getHero().wis}`}</Typography>
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
                                            {`Owner: ${heroDetail?.owner}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </CardContent>
                    <CardActions sx={{ minHeight: "31px", padding: "4px" }}>
                        <Grid container>
                            <Grid item xs={12} md="auto" sx={{ marginRight: "4px" }}>
                                <ButtonGroup size="small" aria-label="small button group" className={classes.battle}>
                                    <ActionButton size="small" onClick={() => { openBattleHistoryDialog() }}>History</ActionButton>
                                    {!!data?.accounts && !!data?.accounts[0] && heroDetail?.owner === data?.accounts[0] &&
                                        <ActionButton size="small" onClick={() => { battle() }}>New</ActionButton>
                                    }
                                </ButtonGroup>
                            </Grid>
                            {!!data?.accounts && !!data?.accounts[0] &&
                                <Grid item xs={12} md="auto">
                                    {(heroDetail?.owner === data?.accounts[0] || heroDetail?.selling?.seller === data?.accounts[0] || heroDetail?.auction?.seller === data?.accounts[0]) ?
                                        <ButtonGroup size="small" aria-label="small button group" className={classes.market}>
                                            {heroDetail?.auction?.minValue === '0' && heroDetail?.selling?.value === '0' &&
                                                <Fragment>
                                                    <ActionButton size="small" onClick={() => { isApprovedForAll ? openSellDialog(token) : openConfirmMarketDialog() }}>
                                                        Sell
                                                    </ActionButton>
                                                    <ActionButton size="small" onClick={() => { isApprovedForAll ? openCreateAuctionDialog(token) : openConfirmMarketDialog() }}>
                                                        Auction
                                                    </ActionButton>
                                                </Fragment>
                                            }
                                            {heroDetail?.selling?.value !== '0' &&
                                                <ActionButton size="small" onClick={() => { disallowBuy() }}>Cancel Sell</ActionButton>
                                            }
                                            {heroDetail?.auction?.minValue !== '0' && heroDetail?.auction?.currValue === '0' &&
                                                <ActionButton size="small" onClick={() => { cancelAuction() }}>Cancel Auction</ActionButton>
                                            }
                                            {heroDetail?.auction?.minValue !== '0' && heroDetail?.auction?.currValue !== '0' &&
                                                <ActionButton size="small">
                                                    {`Curr. Value  ${data?.web3.utils.fromWei(heroDetail?.auction?.currValue, 'ether')}`}
                                                </ActionButton>
                                            }
                                        </ButtonGroup>
                                        :
                                        <Fragment>
                                            {(heroDetail?.auction?.minValue !== '0' || heroDetail?.selling?.value !== '0') &&
                                                <ButtonGroup size="small" aria-label="small button group" className={classes.market}>
                                                    {heroDetail?.auction?.minValue === '0' && heroDetail?.selling?.value !== '0' &&
                                                        <ActionButton size="small" onClick={() => { buy() }}>
                                                            {`BUY ${data?.web3.utils.fromWei(heroDetail?.selling?.value, 'ether')}`}
                                                        </ActionButton>
                                                    }
                                                    {heroDetail?.auction?.minValue !== '0' && heroDetail?.selling?.value === '0' && heroDetail?.auction?.endTime >= new Date().getTime() &&
                                                        <ActionButton size="small" onClick={() => { openBidDialog() }}>
                                                            New Bid
                                                        </ActionButton>
                                                    }
                                                    {heroDetail?.auction?.minValue !== '0' && heroDetail?.selling?.value === '0' && heroDetail?.auction?.endTime < new Date().getTime() &&
                                                        <ActionButton size="small" onClick={() => { finishAuction() }}>
                                                            Finish Auction
                                                        </ActionButton>
                                                    }
                                                </ButtonGroup>
                                            }
                                        </Fragment>
                                    }
                                </Grid>
                            }
                        </Grid>
                    </CardActions>
                </Card>
            </Fragment>
            <ConfirmMarketDialog open={openedConfirmMarketDialog} handleClose={handleCloseConfirmMarketDialog} setApprovalForAll={setApprovalForAll} />
            <SellDialog token={token} open={openedSellDialog} handleClose={handleCloseSellDialog} allowBuy={allowBuy} />
            <CreateAuctionDialog token={token} open={openedCreateAuctionDialog} handleClose={handleCloseCreateAuctionDialog} createAuction={createAuction} />
            {!!heroDetail?.auction &&
                <BidDialog token={token} open={openedBidDialog} handleClose={handleCloseBidDialog} bid={bid}
                    minBid={(heroDetail?.auction?.currValue === '0' ? heroDetail?.auction?.minValue : (parseInt(heroDetail?.auction?.currValue) * 1.1) + '')}
                />
            }
            {!!battles &&
                <BattleHistoryDialog token={token} battles={battles} open={openedBattleHistoryDialog} handleClose={handleCloseBattleHistoryDialog} />
            }
            {!!battleResult &&
                <BattleResultDialog token={token} battle={battleResult} open={openedBattleResultDialog} handleClose={handleCloseBattleResultDialog} />
            }
        </Fragment>
    );
};

export default HeroCard;