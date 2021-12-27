import { Grid, Box, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/styles';
import React, { Fragment, useState } from 'react';
import useHeroes from '../hooks/useHeroes';
import HeroGridItem from '../components/HeroGridItem';

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

    const CustomFormControl = styled(FormControl)(({ theme }) => ({
        "&&": {
            minWidth: 150,
            marginRight: "8px"
        },
        [theme.breakpoints.down('sm')]: {
            "&&": {
                marginTop: 10
            },
        },
    }));

    const FilterSelect = styled(Select)(({ theme }) => ({

        "&": {
            background: '#DCC1A1',
            borderRadius: '1',
            color: '#61422D',
        },
        '&:hover': {
            borderColor: '#61422D',
            borderRadius: '1',
            borderWidth: '2px',
        }
    }));

    const { loading, content } = useHeroes();

    const [type, setType] = useState('-1');
    const [rarity, setRarity] = useState('-1');
    const [onlySelling, setOnlySelling] = useState(false);
    const [ownedByMe, setOwnedByMe] = useState(false);

    const handleRarityChange = (event) => {
        setRarity(event.target.value);
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    return (
        <HeroesBox>
            <Grid container>
                <HeroesGrid item xs={12} md={12} lg={10} xl={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12} xl={12} sx={{
                            "&&": {
                                margin: "16px 0 0 16px ",
                                padding: "24px 16px 16px 16px"
                            },
                            border: "4px solid #61422D",
                            borderRadius: "4px", background: "#FEEDD9"
                        }} >
                            <CustomFormControl >
                                <InputLabel id="class-label">Class</InputLabel>
                                <FilterSelect
                                    size="small"
                                    labelId="class-label"
                                    id="class"
                                    value={type}
                                    onChange={handleTypeChange}
                                    label="CLASS"
                                >
                                    <MenuItem value={'-1'}>All</MenuItem>
                                    <MenuItem value={'0'}>Fighter</MenuItem>
                                    <MenuItem value={'1'}>Rogue</MenuItem>
                                    <MenuItem value={'2'}>Mage</MenuItem>
                                    <MenuItem value={'3'}>Tank</MenuItem>
                                </FilterSelect>
                            </CustomFormControl>
                            <CustomFormControl >
                                <InputLabel id="rarity-label">Rarity</InputLabel>
                                <FilterSelect
                                    size="small"
                                    labelId="rarity-label"
                                    id="rarity"
                                    value={rarity}
                                    onChange={handleRarityChange}
                                    label="RARITY"
                                >
                                    <MenuItem value={'-1'}>All</MenuItem>
                                    <MenuItem value={'0'}>Common</MenuItem>
                                    <MenuItem value={'1'}>Uncommon</MenuItem>
                                    <MenuItem value={'2'}>Rare</MenuItem>
                                    <MenuItem value={'3'}>Legendary</MenuItem>
                                </FilterSelect>
                            </CustomFormControl>
                            <FormControlLabel sx={{ "&": { color: '#61422D' } }} onChange={(e, newValue) => setOnlySelling(newValue)} control={
                                <Checkbox sx={{ "&": { color: '#61422D' } }} checked={onlySelling} />
                            } label="Only Selling" />
                            <FormControlLabel sx={{ "&": { color: '#61422D' } }} onChange={(e, newValue) => setOwnedByMe(newValue)} control={
                                <Checkbox sx={{ "&": { color: '#61422D' } }} checked={ownedByMe} />
                            } label="Owned By Me" />
                        </Grid>
                        {!!content && !!content.heroes && content.heroes
                            .map((hero, heroId) => {
                                return (
                                    <Fragment key={heroId}>
                                        {(type === '-1' || hero.heroType === type) &&
                                            (rarity === '-1' || hero.rarity === rarity) &&
                                            (!onlySelling || content.sellingHeroesIds.indexOf(heroId + '') > -1) &&
                                            (!ownedByMe || content.ownedByMe.indexOf(heroId + '') > -1) &&
                                            <HeroGridItem
                                                hero={hero}
                                                token={heroId}
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