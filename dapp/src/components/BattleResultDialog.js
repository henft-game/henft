import React, { forwardRef, Fragment, useState } from 'react';

import {
    Slide, Dialog, DialogContent, DialogContentText, List, DialogActions,
    Button, ListItem, ListItemAvatar, ListItemText, Typography, LinearProgress,
    linearProgressClasses, typographyClasses
} from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import useBattleSystemListener from '../hooks/useBattleSystemListener';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BattleResultDialog = (props) => {

    const Loading = styled('div')(({ theme }) => ({
        maxWidth: '260px',
        margin: 'auto',
        textAlign: 'center',
    }));

    const useStyles = makeStyles({
        nft: {
            width: 128,
            height: 128,
            borderRadius: 2,
        },
        item: {
            width: 96,
            height: 96,
            borderRadius: 2,
        },
    });

    const classes = useStyles();

    const [isInitialized, setIsInitialized] = useState();
    const resetState = () => {
        setIsInitialized(new Date().getTime());
        props.handleClose();
    }

    const { loading, battleResult } = useBattleSystemListener(props.token, isInitialized);

    return (

        <Dialog
            PaperProps={{
                style: {
                    border: '4px solid #61422D',
                    borderRadius: 4,
                    background: '#FEEDD9',
                    color: '#61422D',
                    margin: '0px',
                }
            }}
            scroll="body" maxWidth="false"
            disableEscapeKeyDown={loading}
            open={props.open}
            onClose={(_, reason) => {
                if (reason !== 'backdropClick') {
                    resetState();
                }
            }}
            TransitionComponent={Transition}>

            {loading &&
                <DialogContent sx={{ padding: '10px' }}>
                    <Loading>
                        <img src="imgs/fighting.gif" alt="fighting" />
                        <Typography component="p">fighting...</Typography>
                        <Typography component="span" sx={{ display: 'block', fontSize: '8px', padding: '5px' }}>
                            We are sending the request to the blockchain, this may take a while. If it takes too long, please refresh the page.
                        </Typography>
                    </Loading>
                </DialogContent>
            }
            {!!battleResult &&
                <Fragment>
                    <DialogContent sx={{ padding: '10px' }}>
                        <DialogContentText>
                            <Typography component="span" sx={{ textAlign: 'center', display: 'block' }}>
                                Battle Result:
                            </Typography>
                            <Typography component="span" sx={{ textAlign: 'center', display: 'block' }}>
                                {`#${battleResult?.battleResult.aHeroId} vs #${battleResult?.battleResult.dHeroId}`}
                            </Typography>
                        </DialogContentText>
                        <List sx={{ color: '#61422D', background: '#DCC1A1', padding: '10px', borderRadius: 1, }}>
                            <ListItem sx={{ padding: "0" }}>
                                <ListItemAvatar>
                                    <img className={classes.nft} src={battleResult?.battleResult.tokenURI} alt={`#${battleResult?.battleResult.dHeroId}`} />
                                </ListItemAvatar>
                                <ListItemText sx={{ textAlign: 'center', [`& .${typographyClasses.body1}`]: { fontSize: '36px', color: battleResult?.battleResult.points > 0 ? '#22673C' : '#C03C3B' } }}
                                    primary={`${battleResult?.battleResult.points > 0 ? "WON" : "LOSE"}`}
                                    secondary={`${new Date(parseInt(battleResult?.battleResult.date) * 1000).toLocaleString()}`} />
                            </ListItem>
                            <ListItem sx={{
                                padding: '10px', background: '#FEEDD9',
                                marginTop: '10px', borderRadius: 1,
                                position: 'relative',
                                border: '1px solid #61422D',
                                "&:before": {
                                    position: 'absolute',
                                    content: '"Rewards"',
                                    fontSize: '12px',
                                    top: '-9px',
                                    padding: '4px',
                                    left: '50%',
                                    marginLeft: '-42px',
                                    width: '84px',
                                    border: '1px solid #61422D',
                                    background: '#DCC1A1',
                                    borderRadius: 2,
                                }
                            }}>
                                <List sx={{ padding: '0px', width: '100%' }}>
                                    <ListItem sx={{ padding: '0px' }}>
                                        <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }} primary={`Points Received: ${battleResult?.battleResult.points}`} />
                                    </ListItem>
                                    {/*
                                    <ListItem sx={{ padding: '0px' }}>
                                        <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }} primary={`This month score: 0`} />
                                    </ListItem>
                                    */}
                                    {!!battleResult?.consumable && battleResult?.consumable.consumableType !== '-1' &&
                                        <Fragment>
                                            <ListItem sx={{ padding: '0px' }}>
                                                <ListItemText sx={{
                                                    [`& .${typographyClasses.body1}`]: { fontSize: '14px' },
                                                    [`& .${typographyClasses.body2}`]: { fontSize: '14px', color: '#61422D' }
                                                }} primary={`You received a new item,`} secondary={`you can see it in the item menu.`} />
                                                <ListItemAvatar>
                                                    <img className={classes.item} src={battleResult?.consumable.tokenURI} alt={`#${battleResult?.consumable.consumableType}`} />
                                                </ListItemAvatar>
                                            </ListItem>
                                        </Fragment>
                                    }
                                    <ListItem sx={{ padding: '0px' }}>
                                        {battleResult?.levelUp.currXP === '0' ?
                                            <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }}
                                                primary={`NEW Level ${battleResult?.levelUp.level} (XP:${battleResult?.levelUp.currXP}/${Math.pow(2, parseInt(battleResult?.levelUp.level))}) `} />
                                            :
                                            <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }}
                                                primary={`Level ${battleResult?.levelUp.level} (XP:${battleResult?.levelUp.currXP}/${Math.pow(2, parseInt(battleResult?.levelUp.level))}) `} />
                                        }
                                    </ListItem>
                                    <ListItem sx={{ padding: '0px' }}>
                                        <LinearProgress sx={{
                                            width: '100%',
                                            height: '10px',
                                            background: '#FEEDD9',
                                            border: "2px solid #61422D",
                                            borderRadius: "2px",
                                            [`& .${linearProgressClasses.bar}`]: {
                                                background: '#61422D'
                                            }
                                        }}
                                            variant="determinate" value={battleResult?.levelUp.currXP / Math.pow(2, parseInt(battleResult?.levelUp.level)) * 100} />
                                    </ListItem>
                                </List>
                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={resetState}>Close</Button>
                    </DialogActions>
                </Fragment>
            }
        </Dialog >

    );

}

export default BattleResultDialog;