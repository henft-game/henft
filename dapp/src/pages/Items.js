import React, { Fragment, useState, useEffect } from 'react';
import { styled } from '@mui/styles';
import useConsumables from '../hooks/useConsumables';
import { Grid, Box } from '@mui/material';
import ConsumableGridItem from '../components/ConsumableGridItem';
import { Link } from 'react-router-dom';

const Items = () => {

    const LinkItem = styled(Link)(({ theme }) => ({
        width: '256px',
        height: '61px',
        paddingTop: '164px',
        fontSize: '13px',
        marginTop: '20px',
        margin: 'auto',
        display: 'flex',
        background: "url('imgs/card.png') no-repeat",
        backgroundSize: 'contain',
        textDecoration: 'none',
        textAlign: 'center',
        color: "#000",
        "&:hover": {
            textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff",
        },
    }));

    const Loading = styled('div')(({ theme }) => ({
        padding: 20,
        width: '100%',
        margin: 'auto',
    }));

    const ConsumablesBox = styled(Box)(({ theme }) => ({
        "&&": {
            paddingTop: '140px',
            paddingBottom: '40px',
        },
    }));

    const ConsumablesGrid = styled(Grid)(({ theme }) => ({
        "&&": {
            margin: 'auto',
            padding: '10px',
        },
        [theme.breakpoints.down('sm')]: {
            "&&": {
                padding: 0,
            },
        },
    }));

    const SectionGrid = styled(Box)(({ theme }) => ({
        "&&": {
            height: '100%',
            background: '#DCC1A1',
            border: '4px solid #61422D',
            borderRadius: '4px',
            position: 'relative',
        },
        [theme.breakpoints.down('sm')]: {
            "&": {
            },
        },
        "&:before": {
            textAlign: 'center',
            position: 'absolute',
            fontSize: 12,
            top: -15,
            padding: 3,
            left: '50%',
            marginLeft: -72,
            width: 144,
            border: '4px solid #61422D',
            background: '#DCC1A1',
            borderRadius: '4px',
        },
    }));

    const { loading, content } = useConsumables();

    const [consumables, setConsumables] = useState();
    const [heroesIds, setHeroesIds] = useState();

    useEffect(() => {
        setConsumables(content?.consumables?.reduce(reducer, []));
        setHeroesIds(content?.heroesIds);
    }, [content])



    const reducer = (prev, curr) => {

        const getType = (con) => {
            if (con.maxXPGain === '10') {
                return 0;
            } else if (con.maxXPGain === '100') {
                return 1;
            } else if (con.generateArenaTicket) {
                return 2;
            } else if (con.generateEquipment) {
                return 3;
            }
        }

        const currType = getType(curr);
        let added = false;
        for (let i = 0; i < prev.length; i++) {
            if (currType === prev[i].type) {
                added = true;
                break;
            }
        }

        if (!added) {
            prev.push({ ids: [curr.id], type: currType, total: 1 });
        } else {
            for (let i = 0; i < prev.length; i++) {
                if (currType === prev[i].type) {
                    prev[i].total++;
                    prev[i].ids.push(curr.id);
                    break;
                }
            }
        }
        return prev;

    };

    return (
        <ConsumablesBox>
            <Grid container>
                <ConsumablesGrid item xs={12} md={10} lg={8} xl={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SectionGrid container spacing={2} sx={{ "&:before": { content: '"Inventory"' }, display: 'flex' }}>
                                <LinkItem to="/roadmap" >
                                    Under Contruction. Check our roadmap!
                                </LinkItem>
                            </SectionGrid>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <SectionGrid container spacing={2} sx={{ "&:before": { content: '"Consumables"' } }}>
                                {!loading &&
                                    <Fragment>
                                        <Box sx={{ height: 20 }} />
                                        <ConsumableGridItem heroesIds={heroesIds} consumableType={'0'} consumable={consumables?.filter(con => con.type === 0)[0]}
                                            helpText="You choose one of your hens to receive 10% exp to the next level, up to 10 exp." />
                                        <ConsumableGridItem heroesIds={heroesIds} consumableType={'1'} consumable={consumables?.filter(con => con.type === 1)[0]}
                                            helpText="You choose one of your hens to receive 50% exp to the next level, up to 100 exp." />
                                        <ConsumableGridItem heroesIds={heroesIds} consumableType={'2'} consumable={consumables?.filter(con => con.type === 2)[0]}
                                            helpText="You choose one of your hens to receive one free victory, so you gain the victory reward and the hen one victory point." />
                                        <ConsumableGridItem consumableType={'3'} consumable={consumables?.filter(con => con.type === 3)[0]}
                                            helpText="???" />
                                    </Fragment>
                                }
                                {loading &&
                                    <Loading><img src="imgs/loading.gif" alt="loading" />loading...</Loading>
                                }
                            </SectionGrid>
                        </Grid>
                        <Grid item xs={12}>
                            <SectionGrid container spacing={2} sx={{ "&:before": { content: '"Marketplace"' }, display: 'flex' }}>
                                <LinkItem to="/roadmap">
                                    Under Contruction. Check our roadmap!
                                </LinkItem>
                            </SectionGrid>
                        </Grid>
                    </Grid>
                </ConsumablesGrid>
            </Grid>
        </ConsumablesBox>
    );
}

export default Items;