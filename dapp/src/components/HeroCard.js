import Blockies from 'react-blockies';
import { Card, CardActions, CardContent, CardHeader, Grid, Typography, Button, Divider, LinearProgress, ButtonGroup, Link } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles, styled } from '@mui/styles';
import React, { Fragment, useContext, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import Text from './Text';
import SellDialog from './SellDialog';
import CreateAuctionDialog from './CreateAuctionDialog';
import BidDialog from './BidDialog';
import ConfirmMarketDialog from './ConfirmMarketDialog';
import BattleHistoryDialog from './BattleHistoryDialog';
import BattleResultDialog from './BattleResultDialog';
import useHeroDetails from '../hooks/useHeroDetails';
import useHeroTokenURI from '../hooks/useHeroTokenURI';
import { event } from '../services/tracking';
import MustBeLoggedDialog from './MustBeLoggedDialog';

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
            marginLeft: -75,
            textAlign: 'center',
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

    const [equipment] = useState();

    const [battles, setBattles] = useState([]);

    const loadHero = async function () {
        console.log("reload hero: " + token);
        setHero(await data?.contract?.methods.getHeroComplete(token).call())
    }

    const disallowBuy = async function () {
        await data?.market.methods.disallowBuy(token).send({ from: data?.accounts[0] });
        event({
            category: 'Marketplace',
            action: `Cancel Selling #${token}`,
        });
    }

    const buy = async function () {
        if (!!data?.accounts && !!data?.accounts[0]) {
            await data?.market.methods.buy(token).send({ from: data?.accounts[0], value: heroDetail?.selling?.value });
            event({
                category: 'Marketplace',
                action: `Buy #${token}: ${parseFloat(data?.web3.utils.fromWei(heroDetail?.selling?.value))}`,
            });
        } else {
            openMustBeLoggedDialog();
        }
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
        openBattleResultDialog();
        await data?.battleSystem.methods.battle(token).send({ from: data?.accounts[0], gas: '600000' });
        event({
            category: 'Battle System',
            action: `New Battle #${token}`,
        });

    }

    const bid = async function (value) {
        if (!!data?.accounts && !!data?.accounts[0]) {
            await data?.market.methods.bid(token).send({ from: data?.accounts[0], value: data?.web3.utils.toWei(value) });
            event({
                category: 'Marketplace',
                action: `New Bid #${token}: ${parseFloat(value)}`,
            });

            handleCloseBidDialog();
        } else {
            openMustBeLoggedDialog();
        }
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

    const getHero = function () {
        if (!!hero) {
            return hero;
        }
        return heroInstance;
    }

    const { loadingHeroDetail, heroDetail } = useHeroDetails(token);

    const { tokenURI } = useHeroTokenURI(token);

    const [hero, setHero] = useState();

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
        loadHero();
    }

    const [openedMustBeLoggedDialog, setOpenedMustBeLoggedDialog] = useState(false);

    const openMustBeLoggedDialog = async () => {
        setOpenedMustBeLoggedDialog(true);

    }

    const handleCloseMustBeLoggedDialog = () => {
        setOpenedMustBeLoggedDialog(false);
    }

    const shortAccount = function (account) {
        return `${account.substr(0, 4)}...${account.substr(-3)}`;
    }

    return (
        <Fragment>
            <Fragment>
                <Card
                    sx={{
                        padding: '10px',
                        maxWidth: '700px',
                        background: '#FEEDD9',
                        border: '4px solid #61422D',
                        borderRadius: 1,

                    }}>
                    <CardHeader sx={{ padding: "0", marginBottom: "3px" }}
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

                    <CardContent sx={{ padding: "0", background: '#DCC1A1', borderRadius: "2px" }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container justify="flex-start" sx={{ color: '#61422D', padding: "7px" }}>
                                    <NftGrid item xs={12} md={6}>
                                        {!!tokenURI ?
                                            <img className={classes.nft} src={tokenURI} alt={`#${token}`} />
                                            :
                                            <img className={classes.nft} src="imgs/loading_hen.gif" alt={`#${token}`} />
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
                                        <Grid container sx={{ paddingTop: "4px" }}>
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontSize: "8px", paddingTop: '4px' }}>{`Season:${getHero().season}`}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {!!heroDetail?.owner ?
                                                    <Grid container justifyContent="flex-end">
                                                        <Grid item>
                                                            <Blockies
                                                                seed={heroDetail?.owner}
                                                                size={9}
                                                                scale={2}
                                                                className="identicon"
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Link href={`${process.env.REACT_APP_BLOCK_EXPLORER_URLS}/address/${heroDetail?.owner}`}
                                                                underline="hover" variant="body1"
                                                                sx={{
                                                                    float: 'right',
                                                                    marginLeft: '4px',
                                                                    fontSize: '8px',
                                                                    paddingTop: '4px'
                                                                }}>
                                                                {shortAccount(heroDetail?.owner)}
                                                            </Link>
                                                        </Grid>
                                                    </Grid>
                                                    :
                                                    <Typography sx={{ fontSize: "8px", textAlign: "right", paddingTop: '4px' }}>
                                                        loading...
                                                    </Typography>}
                                            </Grid>
                                        </Grid>
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
                            {!loadingHeroDetail &&
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
                                            {heroDetail?.auction?.minValue !== '0' && !!heroDetail?.auction?.currValue && heroDetail?.auction?.currValue !== '0' &&
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
            {!!openedBidDialog && !!heroDetail?.auction &&
                <BidDialog token={token} open={openedBidDialog} handleClose={handleCloseBidDialog} bid={bid}
                    minBid={(heroDetail?.auction?.currValue === '0' ? heroDetail?.auction?.minValue : (parseInt(parseInt(heroDetail?.auction?.currValue) * 1.1)) + '')}
                />
            }
            {!!openedBattleHistoryDialog && !!battles &&
                <BattleHistoryDialog token={token} battles={battles} open={openedBattleHistoryDialog} handleClose={handleCloseBattleHistoryDialog} />
            }
            {!!openedBattleResultDialog &&
                <BattleResultDialog token={token} open={openedBattleResultDialog} handleClose={handleCloseBattleResultDialog} />
            }
            {!!openedMustBeLoggedDialog &&
                <MustBeLoggedDialog open={openedMustBeLoggedDialog} handleClose={handleCloseMustBeLoggedDialog} />
            }
        </Fragment>
    );
};

export default HeroCard;