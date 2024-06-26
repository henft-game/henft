import React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CardMedia, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/styles';

const About = () => {

    const Text = styled('p')(({ theme }) => ({
        lineHeight: '22px'
    }));

    const Title = styled('h2')(({ theme }) => ({
        marginTop: '30px'
    }));

    const Img = styled('img')(({ theme }) => ({
        maxWidth: '320px',
        width: '100%',
    }));

    const AboutBox = styled(Box)(({ theme }) => ({
        "&&": {
            paddingTop: '140px',
            paddingBottom: '40px',

        },
    }));

    const NormalDiv = styled('div')(({ theme }) => ({
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    }));

    const MobileDiv = styled('div')(({ theme }) => ({
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    }));


    return (
        <AboutBox>
            <Grid container>
                <Grid item sx={{ margin: 'auto', background: '#DCC1A1', border: '4px solid #61422D', padding: '10px', borderRadius: '4px' }} xs={12} md={10} lg={8} xl={6}>
                    <Title style={{ marginTop: 0 }}>The Project</Title>

                    <Text>
                        HeNFT is a NFT game that uses ERC 721 Standard and has all the code in the block chain,
                        our focus is to keep everything transparent as possible. The Hens that you buy are 100%
                        owned by you and they cannot be replicated, taken away, or destroyed. The project aims
                        to create a NFT collection divided by seasons, where each season will have 200 unique Hens.
                        We want to give value to the first supporters but our focus is not to overprice new hens,
                        so we will never skyrocket the price of our arts between seasons, instead we will readjust
                        the price in a fair amount.
                    </Text>

                    <Title>The Game</Title>

                    <Text id="how_to_buy">
                        In HeNFT players are able to fight using the Hens that they hold, improve their levels and for every
                        single victory receive items that can be sold in the marketplace. Keep in mind that our revenue is
                        100% based on the value of the hens sold the first time, all the other values charged in the game are
                        gas fees and values that are reverted to the game or players.
                    </Text>

                    <Title>How to buy a Hen?</Title>

                    <Text>
                        HeNTF uses BNB as currency, to buy a hen you need to have a BNB wallet, you can choose any wallet you want.
                        If you don't know which one to use, we recommend Metamask, we have nothing to do with the wallet, but we
                        recommend this one because it was the wallet used to test the project.
                    </Text>

                    <Text><Link target="_blank" rel="noopener" href="https://metamask.io/">Metamask website</Link></Text>
                    <Text><Link target="_blank" rel="noopener" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Metamask Google Chrome extension</Link></Text>

                    <Title id="why_to_buy">Why to Buy a HeNFT?</Title>

                    <Text>
                        People can buy HeNFT for three different reasons, first as a way of investment, the value of a hens
                        will increase with the coin and with the project growth. Second, by the game, HeNFT is a play to
                        earn game where the best player every month receives a reward for its position and also will be
                        immortalized in our history/rank. And third, by the arts, pixel art collectors that have interest
                        in our art and ideas.
                    </Text>

                    <Title>Can I have multiple Hens?</Title>

                    <Text>
                        Yes, they are limited but a single person can hold multiple hens, to avoid that enthusiasts buy
                        almost all the hens and other people lose the chance to join the game, we will keep releasing
                        new hens and sometimes selling in different ways and many times doing giveaways.
                    </Text>

                    <Title>The team</Title>

                    <Text>
                        We are two members and one extra help artist, we have our works and other tasks to keep with,
                        and this project is a labor of love that we develop in our lunch time and after work.
                    </Text>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6} xl={4}>
                            <Card sx={{
                                background: '#f9ecd9',
                                borderRadius: '0',
                                boxShadow: '2px 2px 5px 0 rgb(0,0,0,75%)',
                            }}>
                                <CardMedia
                                    component="img"
                                    image="imgs/faita.jpg"
                                    alt="Rafael Faita"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Rafael
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Faita
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Software Developer
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={4}>
                            <Card sx={{
                                background: '#f9ecd9',
                                borderRadius: '0',
                                boxShadow: '2px 2px 5px 0 rgb(0,0,0,75%)',
                            }}>
                                <CardMedia
                                    component="img"
                                    image="imgs/gui.jpg"
                                    alt="Guilherme Campagnolli Hilsdorf"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Guilherme
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Hilsdorf
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Software Developer & Art
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={4}>
                            <Card sx={{
                                background: '#f9ecd9',
                                borderRadius: '0',
                                boxShadow: '2px 2px 5px 0 rgb(0,0,0,75%)',
                            }}>
                                <CardMedia
                                    component="img"
                                    image="imgs/cam.jpg"
                                    alt="Camila Moura"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Camila
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Moura
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Art(extra hand)
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>


                    <Title>How are the Hens made?</Title>

                    <NormalDiv>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md sx={{ textAlign: 'right' }}>
                                <Text>1. We have a big list of cool ideas and historical things,</Text>
                            </Grid>
                            <Grid item xs={12} md sx={{ textAlign: 'left' }}>
                                <Img src="imgs/eggnext.gif" alt="egg next" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md sx={{ textAlign: 'right' }}>
                                <Img src="imgs/new_hen.gif" alt="new hen" />
                            </Grid>
                            <Grid item xs={12} md sx={{ textAlign: 'left' }}>
                                <Text>2. We pick one idea from there and draw a friendly hen,</Text>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md sx={{ textAlign: 'right' }}>
                                <Text>3. We share with the other members, friends and family to get reviews,</Text>
                            </Grid>
                            <Grid item xs={12} md sx={{ textAlign: 'left' }}>
                                <Img src="imgs/changes.gif" alt="changes" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md sx={{ textAlign: 'right' }}>
                                <Img src="imgs/rarity.gif" alt="rarity" />
                            </Grid>
                            <Grid item xs={12} md sx={{ textAlign: 'left' }}>
                                <Text>4.We define the rarity of that hen based on how nice and famous it is and how hard was to do,</Text>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md sx={{ textAlign: 'right' }}>
                                <Text>5.We generate random attributes using one small application that we developed,</Text>
                            </Grid>
                            <Grid item xs={12} md sx={{ textAlign: 'left' }}>
                                <Img src="imgs/attributes.gif" alt="attributes" />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md sx={{ textAlign: 'right' }}>
                                <Img src="imgs/eggBox.gif" alt="rarity" />
                            </Grid>
                            <Grid item xs={12} md sx={{ textAlign: 'left' }}>
                                <Text>6.We wait for a total of 8 hens finished and finally we deliver it to you!</Text>
                            </Grid>
                        </Grid>
                    </NormalDiv>

                    <MobileDiv>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md>
                                <Text>1. We have a big list of cool ideas and historical things,</Text>
                            </Grid>
                            <Grid item xs={12} md>
                                <Img src="imgs/eggnext.gif" alt="egg next" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md>
                                <Text>2. We pick one idea from there and draw a friendly hen,</Text>
                            </Grid>
                            <Grid item xs={12} md>
                                <Img src="imgs/new_hen.gif" alt="new hen" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md>
                                <Text>3. We share with the other members, friends and family to get reviews,</Text>
                            </Grid>
                            <Grid item xs={12} md>
                                <Img src="imgs/changes.gif" alt="changes" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md>
                                <Text>4.We define the rarity of that hen based on how nice and famous it is and how hard was to do,</Text>
                            </Grid>
                            <Grid item xs={12} md>
                                <Img src="imgs/rarity.gif" alt="rarity" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md>
                                <Text>5.We generate random attributes using one small application that we developed,</Text>
                            </Grid>
                            <Grid item xs={12} md>
                                <Img src="imgs/attributes.gif" alt="attributes" />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} md>
                                <Text>6.We wait for a total of 8 hens finished and finally we deliver it to you!</Text>
                            </Grid>
                            <Grid item xs={12} md>
                                <Img src="imgs/eggBox.gif" alt="rarity" />
                            </Grid>
                        </Grid>
                    </MobileDiv>
                </Grid>
            </Grid>

        </AboutBox>
    );
}

export default About;