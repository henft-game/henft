import React from 'react';
import ConsumableCard from './ConsumableCard';
import { Grid, Box } from '@mui/material';
import LazyLoad from 'react-lazyload';

const ConsumableGridItem = function ({ consumableType, consumable, isApprovedForAll, heroesIds }) {
    return (
        <Grid item xs={12}>
            <LazyLoad offset={500} once placeholder={
                <Grid item xs={12}>
                    <Box sx={{ minHeight: 380 }}><img src="imgs/loading.gif" alt="loading" />loading...</Box>
                </Grid>
            }>
                <ConsumableCard heroesIds={heroesIds} consumableType={consumableType} consumableInstance={consumable} isApprovedForAll={isApprovedForAll} />
            </LazyLoad>
        </Grid>
    );
};

export default ConsumableGridItem;