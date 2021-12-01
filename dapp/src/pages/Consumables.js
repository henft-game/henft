import React, { Fragment } from 'react';
import { styled } from '@mui/styles';
import useConsumables from '../hooks/useConsumables';
import { Grid, Box, Typography, AppBar } from '@mui/material';
import ConsumableGridItem from '../components/ConsumableGridItem';

const Consumables = () => {

    const AppBarInventory = styled(AppBar)(({ theme }) => ({
        "&&": {
            height: '30vh',
            padding: '10px 5px 0px 5px',
            borderTop: '1px solid #61422D',
            background: "#DCC1A1",
            color: "#61422D",

        },
        "&:before": {
            position: 'absolute',
            content: '"Inventory"',
            fontSize: 9,
            top: -9,
            padding: 3,
            left: '50%',
            marginLeft: -41,
            width: 82,
            border: '1px solid #61422D',
            background: '#DCC1A1',
            borderRadius: 2,
        },
        [theme.breakpoints.down('md')]: {
            "&&": {
                height: '25vh',
            }
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

    const { loading, content } = useConsumables();

    const getType = (con) => {
        if (con.maxXPGain === 10) {
            return 0;
        } else if (con.maxXPGain === 100) {
            return 1;
        } else if (con.generateArenaTicket) {
            return 2;
        } else if (con.generateEquipment) {
            return 3;
        } else {
            return 4
        }
    }

    const reducer = (prev, curr) => {
        const currType = getType(curr);
        let added = false;
        for (let i = 0; i < prev.length; i++) {
            if (currType === prev[i].type) {
                added = true;
                break;
            }
        }

        if (!added) {
            prev.push({ id: curr.id, type: currType, total: 1 });
        } else {
            for (let i = 0; i < prev.length; i++) {
                if (currType === prev[i].type) {
                    prev[i].total++;
                    break;
                }
            }
        }
        return prev;

    };

    return (
        <ConsumablesBox>
            <Grid container>
                <ConsumablesGrid item xs={12} md={12} lg={10} xl={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} md={6} lg={6} xl={6} >
                                    meus equips
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={6} >
                                    market equip
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            my consumables
                        </Grid>
                    </Grid>
                </ConsumablesGrid>
            </Grid>

        </ConsumablesBox>
    );
}

export default Consumables;