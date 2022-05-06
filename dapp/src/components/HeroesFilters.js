import {
    Grid, Select, MenuItem, InputLabel, FormControl,
    FormControlLabel, Checkbox, TextField, InputAdornment
} from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';


const HeroesFilters = ({filter, setFilter}) => {

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
            width: '200px',
        },
        '&:hover': {
            borderColor: '#61422D',
            borderRadius: '1',
            borderWidth: '2px',
        }
    }));

    const FilterTextField = styled(TextField)(({ theme }) => ({

        "&": {
            background: '#DCC1A1',
            borderRadius: '1',
            color: '#61422D',
            width: '200px',
        },
        '&:hover': {
            borderColor: '#61422D',
            borderRadius: '1',
            borderWidth: '2px',
        }
    }));

    const handleChange = (prop) => (event) => {
        setFilter({ ...filter, [prop]: event.target.value });
    };

    return (
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
                    value={filter.type}
                    onChange={handleChange('type')}
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
                    value={filter.rarity}
                    onChange={handleChange('rarity')}
                    label="RARITY"
                >
                    <MenuItem value={'-1'}>All</MenuItem>
                    <MenuItem value={'0'}>Common</MenuItem>
                    <MenuItem value={'1'}>Uncommon</MenuItem>
                    <MenuItem value={'2'}>Rare</MenuItem>
                    <MenuItem value={'3'}>Legendary</MenuItem>
                </FilterSelect>
            </CustomFormControl>
            <CustomFormControl >
                <FilterTextField
                    key="heroId"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', autoComplete: 'off' }}
                    size="small"
                    id="heroId"
                    text="text"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">#</InputAdornment>,
                    }}
                    defaultValue={filter.heroId}
                    onBlur={handleChange('heroId')}
                    label="Hen Id" />
            </CustomFormControl>
            <FormControlLabel sx={{ "&": { color: '#61422D' } }} onChange={(e, newValue) => handleChange('onlySelling')(newValue)} control={
                <Checkbox sx={{ "&": { color: '#61422D' } }} checked={filter.onlySelling} />
            } label="Only for sale" />
            <FormControlLabel sx={{ "&": { color: '#61422D' } }} onChange={(e, newValue) => handleChange('ownedByMe')(newValue)} control={
                <Checkbox sx={{ "&": { color: '#61422D' } }} checked={filter.ownedByMe} />
            } label="Owned by me" />
        </Grid>
    )
}

export default HeroesFilters;