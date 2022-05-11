import { Grid, Typography, Button, FormControl, MenuItem, Select, InputLabel, Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/styles';
import React, { Fragment, useContext, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const ConsumableCard = ({ consumableType, consumableInstance, isApprovedForAll, heroesIds, helpText }) => {


    const Consumable = styled('img')(({ theme }) => ({
        marginRight: 5,
        width: '100%',
        height: '100%',
        borderRadius: 2,
    }));

    const StatusGrid = styled(Grid)(({ theme }) => ({

        "&&": {
            margin: '6px 0px 0px 0px',
            padding: 20,
            border: '1px solid #61422D',
            position: 'relative',
            borderRadius: 2,
            display: 'flex',

        },
        [theme.breakpoints.down('sm')]: {
            "&&": {
                margin: '13px 0px 0px 0px',
            },
        },
        "&:before": {
            position: 'absolute',
            content: '"Consumable"',
            textAlign: 'center',
            fontSize: 12,
            top: -9,
            padding: 3,
            left: '50%',
            marginLeft: -72,
            width: 144,
            border: '1px solid #61422D',
            background: '#DCC1A1',
            borderRadius: 2,
        }
    }));

    const ActionButton = styled(Button)(({ theme }) => ({

        "&&": {
            background: '#FEEDD9',
            color: '#61422D',
            border: '2px solid #61422D',
            borderRadius: '1',
            textTransform: 'capitalize',

        },
        '&&:hover': {
            borderColor: '#61422D',
            borderRadius: '1',
            borderWidth: '2px',
        }
    }));

    const NftGrid = styled(Grid)(({ theme }) => ({

        "&&": {
            paddingRight: "7px",
        },
        [theme.breakpoints.down('sm')]: {
            "&&": {
                paddingRight: "0px",
            },
        },
    }));

    const HeroIdSelect = styled(Select)(({ theme }) => ({

        color: '#61422D',
        "&": {
            background: '#FEEDD9',
            borderRadius: '1',
            color: '#61422D',
            marginRight: 12,
        },
        '&:hover': {
            borderColor: '#61422D',
            borderRadius: '1',
            borderWidth: '2px',
        }
    }));

    const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} followCursor enterTouchDelay={0} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            lineHeight: '24px',
            fontSize: '15px',
            background: '#302A25',
        },
    });

    const consType = {
        '0': 'imgs/xpGain10.gif',
        '1': 'imgs/xpGain50.gif',
        '2': 'imgs/arenaTicket.gif',
        '3': 'imgs/chest.gif'
    }

    const [using, setUsing] = useState(false);
    const [heroId, setHeroId] = useState();
    const [consumable, setConsumable] = useState();

    const { data } = useContext(Web3Context);

    const useConsumable = async () => {
        setUsing(true);
        try {
            await data?.consumable.methods.consume(heroId || heroesIds[0], getConsumable().ids[getConsumable().ids.length - 1]).send({ from: data?.accounts[0] });
            if (!!consumable) {
                setConsumable({
                    ...consumable,
                    ids: consumable.ids.splice(0, consumable.ids.length - 1),
                    total: consumable.total - 1
                });
            } else {
                setConsumable({
                    ...consumableInstance,
                    ids: consumableInstance.ids.splice(0, consumableInstance.ids.length - 1),
                    total: consumableInstance.total - 1
                });
            }
        } finally {
            setUsing(false);
        }
    }

    const getConsumable = () => {
        if (!!consumable) {
            return consumable;
        }
        return consumableInstance;
    }

    return (
        <Grid container justify="flex-start" sx={{
            color: '#61422D', padding: "7px",
            background: '#DCC1A1',
            border: 'none',
        }}>
            <NftGrid item xs={12} md={4}>
                <CustomTooltip title={helpText}>
                    <Consumable src={consType[consumableType]} alt={consumableType} />
                </CustomTooltip>
            </NftGrid>
            <StatusGrid item xs={12} md={8}>
                <Grid container sx={{ marginTop: "7px", textAlign: 'center' }}>
                    {/* <Grid item xs={12}>
                        <Typography sx={{ fontSize: "13px" }}>{`0 available at the moment`}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ActionButton size="small">Buy</ActionButton> <ActionButton size="small">Sell</ActionButton>
                    </Grid> */}
                    <Grid item xs={12}>
                        {!!getConsumable() ?
                            <Typography sx={{ fontSize: "16px" }}>{`You have x${getConsumable().total}`}</Typography>
                            :
                            <Typography sx={{ fontSize: "16px" }}>{`You have x0`}</Typography>
                        }
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '10px' }}>
                        {!!getConsumable() && getConsumable().total > 0 &&
                            <Fragment>
                                {!!heroesIds &&
                                    <FormControl>
                                        <InputLabel id="hero-label">Hero</InputLabel>
                                        <HeroIdSelect
                                            disabled={using}
                                            size="small"
                                            labelId="hero-label"
                                            id="hero-select"
                                            value={heroId || heroesIds[0]}
                                            label="HERO"
                                            onChange={(e) => { setHeroId(e.target.value) }}
                                        >
                                            {heroesIds.map((hId, index) => {
                                                return (
                                                    <MenuItem key={index} sx={{ color: '#61422D', }} value={hId}>{`#${hId}`}</MenuItem>
                                                )
                                            })}
                                        </HeroIdSelect>
                                    </FormControl>
                                }
                                <ActionButton disabled={using} onClick={useConsumable}>Use</ActionButton>
                            </Fragment>
                        }
                    </Grid>
                </Grid>
            </StatusGrid>
        </Grid>
    );
};

export default ConsumableCard;