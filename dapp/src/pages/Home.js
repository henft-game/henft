import { Box, Grid, List, ListItem } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

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
            content: '"Lastest News"',
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


    const HeroTop1 = styled('img')(({ theme }) => ({
        position: 'absolute',
        left: '50%',
        width: '300px',
        height: '300px',
        marginLeft: '-150px',
        top: '30px',
        [theme.breakpoints.down('sm')]: {
            top: '80px',
            width: '220px',
            height: '220px',
            marginLeft: '-110px',
        },
    }));

    const Champion = styled('div')(({ theme }) => ({
        background: 'url("imgs/champion.png")',
        position: 'absolute',
        left: '50%',
        bottom: '15px',
        backgroundSize: 'cover',
        width: '400px',
        height: '210px',
        marginLeft: '-200px',
        [theme.breakpoints.down('sm')]: {
            bottom: '60px',
            width: '250px',
            height: '132px',
            marginLeft: '-125px',
        },
    }));




    const LinkMenu = styled(Link)(({ theme }) => ({
        padding: 10,
        border: "3px solid #040303",
        borderRadius: "3px",
        textDecoration: 'none',
        background: "linear-gradient(#FF100C, #FB6800)",
        color: "#F9E8D1",
        textShadow: '3px 0 0 #000, -3px 0 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
        "&:hover": {
            color: "#DCC1A1",
        },
    }));

    return (
        <HomeBox>
            <Grid container>
                <Grid item sx={{ margin: 'auto', padding: '10px', borderRadius: '4px' }} xs={12} md={10} lg={8} xl={6}>

                    <Logo alt="top5" src="imgs/top5.png" />

                    <Box sx={{ textAlign: 'center', width: '100%', padding: '10px', marginTop: '10px' }}>
                        <LinkMenu to="/hens">Get your own Hen</LinkMenu>
                    </Box>

                    <Box sx={{
                        textAlign: 'center', width: '100%',
                        background: 'linear-gradient(to right, rgba(255,0,0,0), #F4E3CC, rgba(255,0,0,0))',
                        padding: '10px', marginTop: '10px'
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



                    <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                        <CustomGrid item xs={12} md={6}>
                            <Top1>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Grid container sx={{ color: '#61422D' }}>
                                            <Grid item sm sx={{ position: 'relative', height: '400px', width: '100%' }}>
                                                <HeroTop1 src="imgs/0.gif" alt={`#`} />
                                                <Champion />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Top1>
                        </CustomGrid>
                        <CustomGrid item xs={12} md={6}>
                            <News>
                                <List sx={{ height: '384px', overflowY: 'scroll' }}>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                    <ListItem>Test</ListItem>
                                </List>
                            </News>
                        </CustomGrid>
                    </Grid>
                </Grid>
            </Grid>
        </HomeBox>
    );
}

export default Home;