import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import React, { Fragment, useContext, useState, useCallback } from 'react';
import { Web3Context } from '../providers/Web3Provider';
import useConsumableTokenURI from '../hooks/useConsumableTokenURI';

const ConsumableCard = ({ con, isApprovedForAll }) => {

    const useStyles = makeStyles({
        nft: {
            marginRight: 5,
            width: '100%',
            height: '100%',
            borderRadius: 2,
        },
    });

    const classes = useStyles();

    const NftGrid = styled(Grid)(({ theme }) => ({

    }));

    const { data } = useContext(Web3Context);

    const { tokenURI } = useConsumableTokenURI(con.id);

    const [openedSellDialog, setOpenedSellDialog] = useState(false);

    const openSellDialog = () => {
        setOpenedSellDialog(true);
    }

    const handleCloseSellDialog = () => {
        setOpenedSellDialog(false);
    }

    return (
        <Fragment>
            <Fragment>
                <Grid container sx={{
                    padding: '3px',
                    maxWidth: '128px',
                    background: '#FEEDD9',
                    border: '1px solid #61422D',
                    borderRadius: '2px',

                }}>
                    <NftGrid item xs={12}>
                        {!!tokenURI ?
                            <img className={classes.nft} src={tokenURI} alt={`#${con.id}`} />
                            :
                            <img className={classes.nft} src="imgs/new_hen.gif" alt={`#${con.id}`} />
                        }
                    </NftGrid>
                    <Grid item xs={12}>
                        <Typography sx={{
                            fontSize: "8px", paddingTop: "4px", textAlign: "right", color: "#61422D"
                        }}>
                            {`Total: ${con.total}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Fragment>
        </Fragment>
    );
};

export default ConsumableCard;