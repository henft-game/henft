import React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/styles';

const About = () => {

    const Text = styled('p')(({ theme }) => ({
        lineHeight: '20px'
    }));


    return (
        <Box sx={{ padding: "20px", paddingTop: '140px' }}>
            <h3>The Project</h3>

            <Text>
                HeNTF is a NFT game that uses ERC 721 Standard and has all the code in the block chain,
                our focus is to keep everything transparent as possible. The Hens that you buy are 100%
                owned by you and they cannot be replicated, taken away, or destroyed. The project aims
                to create a NFT collection divided by seasons, where each season will have 200 unique Hens.
                We want to give value to the first supporters but our focus is not to overprice new hens,
                so we will never skyrocket the price of our arts between seasons, instead we will readjust
                the price in a fair amount.
            </Text>

            <h3>The Game</h3>

            <Text>
                In HeNFT players are able to fight using the Hens that they hold, improve their levels and for every
                single victory receive items that can be sold in the marketplace. Keep in mind that our revenue is
                100% based on the value of the hens sold the first time, all the other values charged in the game are
                gas fees and values that are reverted to the game or players.
            </Text>

            <h3>Why to Buy a HeNFT?</h3>

            <Text>
                People can buy HeNFT for three different reasons, first as a way of investment, the value of a hens
                will increase with the coin and with the project growth. Second, by the game, HeNTF is a play to
                earn game where the best player every month receives a reward for its position and also will be
                immortalized in our history/rank. And third, by the arts, pixel art collectors that have interest
                in our art and ideas.
            </Text>

            <h3>Can I have multiple Hens?</h3>

            <Text>
                Yes, they are limited but a single person can hold multiple hens, to avoid that enthusiasts buy
                almost all the hens and other people lose the chance to join the game, we will keep releasing
                new hens and sometimes selling in different ways and many times doing giveaways.
            </Text>

            <h3>The team</h3>

            <Text>
                We are two members and one extra help artist, we have our works and other tasks to keep with,
                and this project is a labor of love that we develop in our lunch time and after work.
            </Text>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6} xl={4}>
                    <Card sx={{
                        padding: '10px',
                        borderRadius: '0', maxWidth: '700px',
                        boxShadow: '2px 2px 5px 0 rgb(0,0,0,75%)',
                    }}>
                        <CardMedia
                            component="img"
                            image="imgs/faita.jpg"
                            alt="Rafael Faita"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Rafael Faita
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Software Developer
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={4}>
                    <Card sx={{
                        padding: '10px',
                        borderRadius: '0', maxWidth: '700px',
                        boxShadow: '2px 2px 5px 0 rgb(0,0,0,75%)',
                    }}>
                        <CardMedia
                            component="img"
                            image="imgs/faita.jpg"
                            alt="Guilherme Campagnolli Hilsdorf"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Guilherme Hilsdorf
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Software Developer & Art
                            </Typography>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={4}>
                    <Card sx={{
                        padding: '10px',
                        borderRadius: '0', maxWidth: '700px',
                        boxShadow: '2px 2px 5px 0 rgb(0,0,0,75%)',
                    }}>
                        <CardMedia
                            component="img"
                            image="imgs/faita.jpg"
                            alt="Camila Moura"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Camila Moura
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Art(extra hand)
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Box >
    );
}

export default About;