import React, { forwardRef, Fragment } from 'react';

import {
    Slide, Dialog, DialogContent, DialogContentText, List, DialogActions,
    Button, ListItem, ListItemAvatar, ListItemText, Typography, LinearProgress,
    linearProgressClasses, typographyClasses
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BattleResultDialog = (props) => {

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

    return (

        <Dialog
            PaperProps={{
                style: {
                    background: '#DCC1A1',
                    border: '4px solid #61422D',
                    borderRadius: 4,
                    background: '#FEEDD9',
                    color: '#61422D',
                    margin: '0px',
                }
            }}
            scroll="body" maxWidth="false" open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            {!!props.battle &&
                <Fragment>
                    <DialogContent sx={{ padding: '10px' }}>
                        <DialogContentText>
                            <Typography component="span" sx={{ textAlign: 'center', display: 'block' }}>
                                Battle Result:
                            </Typography>
                            <Typography component="span" sx={{ textAlign: 'center', display: 'block' }}>
                                {`#${props.battle.battleResult.aHeroId} vs #${props.battle.battleResult.dHeroId}`}
                            </Typography>
                        </DialogContentText>
                        <List sx={{ color: '#61422D', background: '#DCC1A1', padding: '10px', borderRadius: 1, }}>
                            <ListItem sx={{ padding: "0" }}>
                                <ListItemAvatar>
                                    <img className={classes.nft} src={props.battle.battleResult.tokenURI} alt={`#${props.battle.battleResult.dHeroId}`} />
                                </ListItemAvatar>
                                <ListItemText sx={{ textAlign: 'center', [`& .${typographyClasses.body1}`]: { fontSize: '36px', color: props.battle.battleResult.points > 0 ? '#22673C' : '#C03C3B' } }}
                                    primary={`${props.battle.battleResult.points > 0 ? "WON" : "LOSE"}`}
                                    secondary={`${new Date(parseInt(props.battle.battleResult.date) * 1000).toLocaleString()}`} />
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
                                        <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }} primary={`Points Received: ${props.battle.battleResult.points}`} />
                                    </ListItem>
                                    <ListItem sx={{ padding: '0px' }}>
                                        <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }} primary={`This mount score: 0`} />
                                    </ListItem>
                                    {!!props.battle.consumable && props.battle.consumable.consumableType !== '-1' &&
                                        <Fragment>
                                            <ListItem sx={{ padding: '0px' }}>
                                                <ListItemText sx={{
                                                    [`& .${typographyClasses.body1}`]: { fontSize: '14px' },
                                                    [`& .${typographyClasses.body2}`]: { fontSize: '14px', color: '#61422D' }
                                                }} primary={`You received a new item,`} secondary={`you can see it in the item menu.`} />
                                                <ListItemAvatar>
                                                    <img className={classes.item} src={props.battle.consumable.tokenURI} alt={`#${props.battle.consumable.consumableType}`} />
                                                </ListItemAvatar>
                                            </ListItem>
                                        </Fragment>
                                    }
                                    <ListItem sx={{ padding: '0px' }}>
                                        {props.battle.levelUp.currXP === '0' ?
                                            <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }}
                                                primary={`NEW Level ${props.battle.levelUp.level} (XP:${props.battle.levelUp.currXP}/${Math.pow(2, parseInt(props.battle.levelUp.level))}) `} />
                                            :
                                            <ListItemText sx={{ [`& .${typographyClasses.body1}`]: { fontSize: '14px' } }}
                                                primary={`Level ${props.battle.levelUp.level} (XP:${props.battle.levelUp.currXP}/${Math.pow(2, parseInt(props.battle.levelUp.level))}) `} />
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
                                            variant="determinate" value={props.battle.levelUp.currXP / Math.pow(2, parseInt(props.battle.levelUp.level)) * 100} />
                                    </ListItem>
                                </List>
                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose}>Close</Button>
                    </DialogActions>
                </Fragment>
            }
        </Dialog >

    );

}

export default BattleResultDialog;