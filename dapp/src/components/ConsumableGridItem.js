import React from 'react';
import ConsumableCard from './ConsumableCard';
import { Grid, Box } from '@mui/material';
import LazyLoad from 'react-lazyload';

const ConsumableGridItem = function ({ con, isApprovedForAll }) {
    return (
        <Grid item xs={4} md={2} lg={2} xl={1} xxl={1}>
            <LazyLoad offset={500} once placeholder={
                <Grid item xs={4} md={2} lg={2} xl={1} xxl={1}>
                    <Box sx={{ minHeight: 380 }}><img src="imgs/loading.gif" alt="loading" />loading...</Box>
                </Grid>
            }>
                <ConsumableCard con={con} isApprovedForAll={isApprovedForAll} />
            </LazyLoad>
        </Grid>
    );
};

export default ConsumableGridItem;