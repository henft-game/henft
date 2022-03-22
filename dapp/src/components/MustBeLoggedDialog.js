import React, { forwardRef } from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MustBeLoggedDialog = (props) => {

    return (

        <Dialog PaperProps={{
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
                    You need to connect your wallet to be able to buy a Hen. More information on <NavLink to="/about">About</NavLink> page.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>

    );

}

export default MustBeLoggedDialog;