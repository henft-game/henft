import { Grid, Box } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useState, useRef, useCallback } from 'react';
import useHeroes from '../hooks/useHeroes';
import useIsApprovedForAllMarket from '../hooks/useIsApprovedForAllMarket';
import HeroGridItem from '../components/HeroGridItem';

const Heroes = () => {

    const Loading = styled('div')(({ theme }) => ({
        padding: 20,
    }));

    const HeroesBox = styled(Box)(({ theme }) => ({
        "&&": {
            paddingTop: '140px',
        },
    }));
    const HeroesGrid = styled(Grid)(({ theme }) => ({
        "&&": {
            margin: 'auto',
            background: '#DCC1A1',
            border: '4px solid #61422D',
            padding: '10px',
            borderRadius: '4px',
        },
        [theme.breakpoints.down('sm')]: {
            "&&": {
                padding: 0,
                border: 'none',
                background: 'none',
            },
        },
    }));

    const { isApprovedForAll } = useIsApprovedForAllMarket();
    const { loading, heroes } = useHeroes();

    return (
        <HeroesBox>
            <Grid container>
                <HeroesGrid item xs={12} md={12} lg={10} xl={8}>
                    <Grid container spacing={2}>
                        {heroes.map((hero, heroId) => {
                            return (
                                <HeroGridItem
                                    key={heroId}
                                    hero={hero}
                                    token={heroId}
                                    isApprovedForAll={isApprovedForAll} />
                            );
                        })}
                    </Grid>
                    {loading &&
                        <Loading><img src="imgs/loading.gif" alt="loading"/>loading...</Loading>
                    }
                </HeroesGrid>
            </Grid>

        </HeroesBox>
    )
}

export default Heroes;