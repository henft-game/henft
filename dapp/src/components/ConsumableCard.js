import { Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { Web3Context } from '../providers/Web3Provider';

const ConsumableCard = ({ consumableType, consumable, isApprovedForAll }) => {


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
            height: '26px',

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

    const { data } = useContext(Web3Context);

    const [openedSellDialog, setOpenedSellDialog] = useState(false);

    const openSellDialog = () => {
        setOpenedSellDialog(true);
    }

    const handleCloseSellDialog = () => {
        setOpenedSellDialog(false);
    }

    const consType = {
        '0': 'imgs/xpGain10.gif',
        '1': 'imgs/xpGain50.gif',
        '2': 'imgs/arenaTicket.gif',
        '3': 'imgs/chest.gif'
    }

    return (
        <Grid container justify="flex-start" sx={{
            color: '#61422D', padding: "7px",
            background: '#DCC1A1',
            border: 'none',
        }}>
            <NftGrid item xs={12} md={4}>
                <Consumable src={consType[consumableType]} alt={consumableType} />
            </NftGrid>
            <StatusGrid item xs={12} md={8}>
                <Grid container sx={{ marginTop: "7px", textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: "13px" }}>{`0 available at the moment`}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ActionButton size="small">Buy</ActionButton> <ActionButton size="small">Sell</ActionButton>
                    </Grid>
                    <Grid item xs={12}>
                        {!!consumable ?
                            <Typography sx={{ fontSize: "16px" }}>{`You have x${consumable.total}`}</Typography>
                            :
                            <Typography sx={{ fontSize: "16px" }}>{`You have x0`}</Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {!!consumable && consumable.total > 0 &&
                            <ActionButton size="small">Use</ActionButton>
                        }
                    </Grid>
                </Grid>
            </StatusGrid>
        </Grid>
    );
};

export default ConsumableCard;