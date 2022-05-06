import {
    Grid, Box
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import useHeroes from '../hooks/useHeroes';
import HeroGridItem from '../components/HeroGridItem';
import HeroesFilters from '../components/HeroesFilters';
import { useLocation } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const Heroes = () => {

    const Loading = styled('div')(({ theme }) => ({
        padding: 20,
        margin: 'auto',
    }));

    const HeroesBox = styled(Box)(({ theme }) => ({
        "&&": {
            paddingTop: '140px',
            paddingBottom: '40px',
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


    let query = useQuery();

    useEffect(() => {
        setFilter({
            type: '-1',
            rarity: '-1',
            onlySelling: false,
            ownedByMe: false, 
            heroId: query.get('heroId') || ''
        });
    }, [query])

    const { loading, content } = useHeroes();

    const [filter, setFilter] = useState({
        type: '-1',
        rarity: '-1',
        heroId: '',
        onlySelling: false,
        ownedByMe: false,
    });

    return (
        <HeroesBox>
            <Grid container>
                <HeroesGrid item xs={12} md={12} lg={10} xl={8}>
                    <Grid container spacing={2}>
                        <HeroesFilters filter={filter} setFilter={setFilter} />
                        {!!content && !!content.heroes && content.heroes
                            .map((hero, hId) => {
                                return (
                                    <Fragment key={hId}>
                                        {(filter.type === '-1' || hero.heroType === filter.type) &&
                                            (filter.rarity === '-1' || hero.rarity === filter.rarity) &&
                                            (filter.heroId === '' || (hId + '') === filter.heroId) &&
                                            (!filter.onlySelling || content.sellingHeroesIds.indexOf(hId + '') > -1) &&
                                            (!filter.ownedByMe || content.ownedByMe.indexOf(hId + '') > -1) &&
                                            <HeroGridItem
                                                hero={hero}
                                                token={hId}
                                                isApprovedForAll={content.isApprovedForAll} />
                                        }
                                    </Fragment>
                                );
                            })}
                    </Grid>
                    {loading &&
                        <Loading><img src="imgs/loading.gif" alt="loading" />loading...</Loading>
                    }
                </HeroesGrid>
            </Grid>

        </HeroesBox>
    )
}

export default Heroes;