import React, { forwardRef, Fragment } from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, List, DialogActions, Button, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from '@mui/material';
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
            scroll="body" maxWidth="false" open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <DialogContent>
                <DialogContentText>
                    Battle History of Hero #{props.token}
                </DialogContentText>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {!!props.battles && props.battles.map((battle, battleIndex) => {
                        return (
                            <Fragment key={battleIndex}>
                                <ListItem sx={{ padding: "0" }}>
                                    <ListItemAvatar>
                                        <img className={classes.nft} src={battle.tokenURI} alt={`#${props.token}`} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`versus: #${battle.dHeroId}`}
                                        secondary={
                                            <Fragment>
                                                <Typography>points: {battle.points}</Typography>
                                                {`when: ${new Date(parseInt(battle.date) * 1000)}`}
                                            </Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Fragment>
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