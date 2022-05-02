import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Box, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/styles';
import React, { Fragment } from 'react';
import { Link as NavLink } from 'react-router-dom';
import useBattleTop5 from '../hooks/useBattleTop5';
import useHeroTokenURI from '../hooks/useHeroTokenURI';
import useHeroOwnerOf from '../hooks/useHeroOwnerOf';
import useHeroSelling from '../hooks/useHeroSelling';

const Home = () => {

    const Logo = styled('img')(({ theme }) => ({
        width: '100%',
    }));

    const Text = styled('p')(({ theme }) => ({
        lineHeight: '22px'
    }));

    const HomeBox = styled(Box)(({ theme }) => ({
        "&&": {
            paddingTop: '140px',
            paddingBottom: '40px',

        },
    }));

    const CustomGrid = styled(Grid)(({ theme }) => ({
        margin: 'auto',
        background: '#DCC1A1',
        padding: '10px',
        [theme.breakpoints.down('sm')]: {
            background: 'none',
            padding: 0,
        },
    }));

    const Top1 = styled(Box)(({ theme }) => ({
        flexGrow: 1,
        padding: '10px',
        border: '4px solid #61422D',
        borderRadius: 1,
        backgroundPosition: 'center',
        backgroundSize: '600px',
        background: '#FFEED4 url("imgs/top1.gif") no-repeat',
        position: 'relative',
        "&:before": {
            top: '-26px',
            left: '50%',
            color: '#FFDF00',
            border: '4px solid rgb(97, 66, 45)',
            content: '"Last Month Champion"',
            padding: '6px',
            position: 'absolute',
            fontSize: '15px',
            background: '#DCC1A1',
            textAlign: 'center',
            marginLeft: '-153px',
            borderRadius: '3px',
            textShadow: '3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
        }
    }));

    const News = styled(Box)(({ theme }) => ({
        flexGrow: 1,
        padding: '10px',
        border: '4px solid #61422D',
        borderRadius: 1,
        backgroundPosition: 'center',
        backgroundSize: '600px',
        background: '#FFEED4',
        position: 'relative',
        "&:before": {
            top: '-26px',
            left: '50%',
            color: '#FFEDD9',
            border: '4px solid rgb(97, 66, 45)',
            content: '"Latest News"',
            padding: '6px',
            position: 'absolute',
            fontSize: '15px',
            background: '#DCC1A1',
            textAlign: 'center',
            marginLeft: '-100px',
            borderRadius: '3px',
            textShadow: '3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
        }
    }));

    const Featured = styled(Grid)(({ theme }) => ({
        flexGrow: 1,
        padding: '10px',
        marginBottom: '10px',
        border: '4px solid #61422D',
        borderRadius: 1,
        background: '#FFEED4',
        position: 'relative',
        "&:before": {
            top: '-26px',
            left: '50%',
            color: '#FFEDD9',
            border: '4px solid rgb(97, 66, 45)',
            content: '"Featured Hens"',
            padding: '6px',
            position: 'absolute',
            fontSize: '15px',
            background: '#DCC1A1',
            textAlign: 'center',
            marginLeft: '-104px',
            borderRadius: '3px',
            textShadow: '3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
        }
    }));

    const Roadmap = styled(Box)(({ theme }) => ({
        flexGrow: 1,
        padding: '10px',
        border: '4px solid #61422D',
        borderRadius: 1,
        backgroundPosition: 'center',
        backgroundSize: '600px',
        background: '#FFEED4',
        position: 'relative',
        "&:before": {
            top: '-26px',
            left: '50%',
            color: '#FFEDD9',
            border: '4px solid rgb(97, 66, 45)',
            content: '"Roadmap"',
            padding: '6px',
            position: 'absolute',
            fontSize: '15px',
            background: '#DCC1A1',
            textAlign: 'center',
            marginLeft: '-60px',
            borderRadius: '3px',
            textShadow: '3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
        }
    }));

    const HeroTop1 = styled('img')(({ theme }) => ({
        position: 'absolute',
        left: '50%',
        width: '250px',
        height: '250px',
        marginLeft: '-125px',
        top: '55px',
        [theme.breakpoints.down('sm')]: {
            top: '80px',
            width: '220px',
            height: '220px',
            marginLeft: '-110px',
        },
    }));

    const TextHeroTop1 = styled(Typography)(({ theme }) => ({
        '&&': {
            fontSize: '22px',
            marginLeft: '-114px',
        },
        position: 'absolute',
        left: '50%',
        top: '63px',
        zIndex: '1000',
        color: '#FFDF00',
        textShadow: '3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
        [theme.breakpoints.down('sm')]: {
            top: '90px',
            '&&': {
                marginLeft: '-95px',
            }
        },
    }));

    const TextOwnerOfHeroTop1 = styled(Typography)(({ theme }) => ({
        '&&': {
            fontSize: '7px',
            marginLeft: '-147px',
        },
        position: 'absolute',
        left: '50%',
        top: '380px',
        zIndex: '1000',
        color: '#FFDF00',
        textShadow: '2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
        [theme.breakpoints.down('sm')]: {
        },
    }));

    const TextOfHeroTop1 = styled(Typography)(({ theme }) => ({
        '&&': {
            fontSize: '9px',
        },
        position: 'absolute',
        top: '20px',
        zIndex: '1000',
        [theme.breakpoints.down('sm')]: {
        },
    }));

    const Champion = styled('div')(({ theme }) => ({
        background: 'url("imgs/champion.png")',
        position: 'absolute',
        left: '50%',
        bottom: '30px',
        backgroundSize: 'cover',
        width: '350px',
        height: '184px',
        marginLeft: '-175px',
        [theme.breakpoints.down('sm')]: {
            bottom: '60px',
            width: '250px',
            height: '132px',
            marginLeft: '-125px',
        },
    }));

    const LinkMenu = styled(NavLink)(({ theme }) => ({
        padding: 10,
        border: "4px solid #040303",
        borderRadius: "4px",
        textDecoration: 'none',
        background: "linear-gradient(#FF100C, #FB6800)",
        color: "#F9E8D1",
        textShadow: '4px 0 0 #000, -4px 0 0 #000, 0 4px 0 #000, 0 -4px 0 #000, 3px 3px #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000',
        fontSize: '30px',
        "&:hover": {
            color: "#DCC1A1",
        },
        [theme.breakpoints.down('sm')]: {
            border: "3px solid #040303",
            borderRadius: "3px",
            fontSize: '16px',
            textShadow: '3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
        },
    }));

    const RoadmapLink = styled(NavLink)(({ theme }) => ({
        padding: 10,
        width: '100%',
        height: '372px',
        display: 'block',
        borderRadius: "3px",
        textDecoration: 'none',
        background: "url('imgs/roadmap_sign.png') no-repeat",
        backgroundSize: '189px',
        backgroundPosition: 'center',
    }));

    const HeroSelling = styled('img')(({ theme }) => ({
        width: '100%',
        borderRadius: '3px',
    }));

    const TextHeroSelling = styled(Typography)(({ theme }) => ({
        '&&': {
            fontSize: '22px',
        },
        position: 'absolute',
        left: '20px',
        top: '20px',
        zIndex: '1000',
        color: '#FFF',
        textShadow: '3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
    }));

    const LinkBuy = styled(NavLink)(({ theme }) => ({

        "&&": {
            position: 'absolute',
            bottom: '40px',
            right: '20px',
            background: '#DCC1A1',
            color: '#61422D',
            borderColor: '#61422D',
            textTransform: 'capitalize',
            borderWidth: '2px',
            padding: '10px',
            textDecoration: 'none',
            borderRadius: '2px',
        },
        '&&:hover': {
            background: '#FFEED4',
            borderColor: '#61422D', borderRadius: '1',
            borderWidth: '2px',
        }
    }));

    const { content } = useBattleTop5();

    const { tokenURI } = useHeroTokenURI(content?.top5[0].heroId);
    const { ownerOf } = useHeroOwnerOf(content?.top5[0].heroId);

    const { sellingContent } = useHeroSelling();

    const randomTokenURI = useHeroTokenURI(sellingContent?.randomSellingId);
    const lowestTokenURI = useHeroTokenURI(sellingContent?.lowestSellingId);

    return (
        <HomeBox>
            <Grid container>
                <Grid item sx={{ margin: 'auto', padding: '10px', borderRadius: '4px' }} xs={12} md={10} lg={8} xl={6}>

                    <Logo alt="top5" src="imgs/top5.png" />

                    <Box sx={{ textAlign: 'center', width: '100%', padding: '10px', marginTop: '30px' }}>
                        <LinkMenu to="/hens">Get your own Hen</LinkMenu>
                    </Box>

                    <Box sx={{
                        textAlign: 'center', width: '100%',
                        background: 'linear-gradient(to right, rgba(255,0,0,0), #F4E3CC, rgba(255,0,0,0))',
                        padding: '10px', marginTop: '30px'
                    }}>
                        <h1>What is HeNFT</h1>

                        <Text>
                            HeNFT is a project of collectibles where every
                            single hen is unique and always will be.
                            Our hens are handcrafted and our code is 100%
                            in the block chain.
                            This project is the result of our
                            love by digital art, coding, games and hens.
                        </Text>
                    </Box>
                    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                        <CustomGrid item xs={12} md={6}>
                            <Top1>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Grid container sx={{ color: '#61422D' }}>
                                            <Grid item sm sx={{ position: 'relative', height: '400px', width: '100%' }}>
                                                {!!content &&
                                                    <Fragment>
                                                        <TextHeroTop1>{`#${content?.top5[0].heroId}`}</TextHeroTop1>
                                                        <Link href={`${process.env.REACT_APP_BLOCK_EXPLORER_URLS}/address/${ownerOf}`}
                                                            underline="hover" variant="body1"
                                                            sx={{
                                                            }}>
                                                            <TextOwnerOfHeroTop1>{ownerOf}</TextOwnerOfHeroTop1>
                                                        </Link>
                                                        <TextOfHeroTop1>This is the hen with the most pvp wins in the past month. All hail the champion!</TextOfHeroTop1>
                                                    </Fragment>
                                                }
                                                {!!tokenURI ?
                                                    <HeroTop1 src={tokenURI} alt={`#${content?.top5[0].heroId}`} />
                                                    :
                                                    <HeroTop1 src="imgs/loading_hen.gif" alt={`#${content?.top5[0].heroId}`} />
                                                }
                                                <Champion />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Top1>
                        </CustomGrid>
                        <CustomGrid item xs={12} md={6}>
                            <News>
                                <TwitterTimelineEmbed
                                    sourceType="profile"
                                    noHeader="true"
                                    screenName={`${process.env.REACT_APP_TWITTER_ACCOUNT}`}
                                    options={{ height: 400 }}
                                />
                            </News>
                        </CustomGrid>
                    </Grid>

                    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                        <CustomGrid item xs={12} md={8}>
                            <Featured container>
                                <Grid item xs={12} md={6} sx={{ padding: '10px', position: 'relative' }}>
                                    <Fragment>
                                        {!!sellingContent?.randomSellingId &&
                                            <TextHeroSelling>{`#${sellingContent?.randomSellingId}`}</TextHeroSelling>
                                        }
                                        {!!randomTokenURI?.tokenURI ?
                                            <Fragment>
                                                <HeroSelling src={randomTokenURI?.tokenURI} alt="random selling hero" />
                                                <LinkBuy to="/hens">BUY</LinkBuy>
                                            </Fragment>
                                            :
                                            <HeroSelling src="imgs/loading_hen.gif" alt={`#`} />
                                        }
                                    </Fragment>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ padding: '10px', position: 'relative' }}>
                                    <Fragment>
                                        {!!sellingContent?.lowestSellingId &&
                                            <TextHeroSelling>{`#${sellingContent?.lowestSellingId}`}</TextHeroSelling>
                                        }
                                        {!!lowestTokenURI?.tokenURI ?
                                            <Fragment>
                                                <HeroSelling src={lowestTokenURI?.tokenURI} alt="lowest selling hero" />
                                                <LinkBuy to="/hens">BUY</LinkBuy>
                                            </Fragment>
                                            :
                                            <HeroSelling src="imgs/loading_hen.gif" alt={`#`} />
                                        }
                                    </Fragment>
                                </Grid>
                            </Featured>
                        </CustomGrid>
                        <CustomGrid item xs={12} md={4}>
                            <Roadmap>
                                <RoadmapLink to="/roadmap" />
                            </Roadmap>
                        </CustomGrid>
                    </Grid>
                </Grid>
            </Grid>
        </HomeBox>
    );
}

export default Home;