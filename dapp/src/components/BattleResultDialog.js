import React, { forwardRef, Fragment } from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, List, DialogActions, Button, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BattleResultDialog = (props) => {


    const useStyles = makeStyles({
        nft: {
            marginRight: 15,
            width: 90,
            height: 90,
        },
    });

    const classes = useStyles();


    return (

        <Dialog scroll="body" open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            {!!props.battle &&
                <Fragment>
                    <DialogContent>
                        <DialogContentText>
                            Battle result versus Hero #{props.battle.dHeroId}
                        </DialogContentText>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <ListItem sx={{ padding: "0" }}>
                                <ListItemAvatar>
                                    <img className={classes.nft} src={props.battle.tokenURI} alt={`#${props.battle.dHeroId}`} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`result: ${props.battle.points > 0 ? "WIN" : "LOSE"}`}
                                    secondary={
                                        <Fragment>
                                            <Typography>points: {props.battle.points}</Typography>
                                            {`when: ${new Date(parseInt(props.battle.date) * 1000)}`}
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
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