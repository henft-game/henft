import React, { forwardRef } from 'react';

import {
    Slide, Dialog, DialogContent, DialogContentText,
    List, DialogActions, Button, ListItem, ListItemAvatar, ListItemText, typographyClasses
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BattleHistoryDialog = (props) => {


    const useStyles = makeStyles({
        nft: {
            marginRight: 15,
            width: 90,
            height: 90,
        },
    });

    const classes = useStyles();


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
            scroll="paper" maxWidth="false" open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <DialogContent>
                <DialogContentText>
                    Battle History of Hero #{props.token}
                </DialogContentText>
                <List sx={{ width: '100%', background: '#FEEDD9' }}>
                    {!!props.battles && props.battles.length <= 0 &&
                        <ListItem sx={{ padding: '0px 0px 10px 0px' }}>
                            <List sx={{ width: '100%', color: '#61422D', background: '#DCC1A1', padding: '10px', borderRadius: 1, }}>
                                <ListItem sx={{ padding: "0" }}>
                                    This hen has never attacked anyone.
                                </ListItem>
                            </List>
                        </ListItem>
                    }
                    {!!props.battles && props.battles.map((battleResult, battleIndex) => {
                        return (
                            <ListItem key={battleIndex} sx={{ padding: '0px 0px 10px 0px' }}>
                                <List sx={{ width: '100%', color: '#61422D', background: '#DCC1A1', padding: '10px', borderRadius: 1, }}>
                                    <ListItem sx={{ padding: "0" }}>
                                        <ListItemAvatar>
                                            <img className={classes.nft} src={battleResult?.tokenURI} alt={`#${battleResult?.dHeroId}`} />
                                        </ListItemAvatar>
                                        <ListItemText sx={{ textAlign: 'center', [`& .${typographyClasses.body1}`]: { fontSize: '28px', color: battleResult?.points > 0 ? '#22673C' : '#C03C3B' } }}
                                            primary={`VS #${battleResult?.dHeroId} - ${battleResult?.points > 0 ? "WON" : "LOSE"}`}
                                            secondary={`${new Date(parseInt(battleResult?.date) * 1000).toLocaleString()}`} />
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
                                                <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }} primary={`Points Received: ${battleResult?.points}`} />
                                            </ListItem>
                                        </List>
                                    </ListItem>
                                </List>
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>

    );

}

export default BattleHistoryDialog;