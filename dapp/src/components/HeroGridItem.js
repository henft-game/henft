import React from 'react';
import HeroCard from './HeroCard';
import { Grid, Box } from '@mui/material';
import LazyLoad from 'react-lazyload';

const HeroGridItem = function ({ hero, token, isApprovedForAll }) {
    return (
        <Grid item xs={12} md={6} lg={6} xl={4} xxl={3}>
            <LazyLoad offset={500} once placeholder={
                <Grid item xs={12} md={6} lg={6} xl={4} xxl={3}>
                    <Box sx={{ minHeight: 380 }}><img src="imgs/loading.gif" alt="loading" />loading...</Box>
                </Grid>
            }>
                <HeroCard heroInstance={hero} token={token} isApprovedForAll={isApprovedForAll} />
            </LazyLoad>
        </Grid>
    );
};

export default HeroGridItem;