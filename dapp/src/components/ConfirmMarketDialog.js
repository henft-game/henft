import React, { forwardRef } from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmMarketDialog = (props) => {

    return (

        <Dialog scroll="body" open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <DialogContent>
                <DialogContentText>
                    Do you give permission to our marketplace to access your tokens?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={() => { props.setApprovalForAll() }}>Ok</Button>
            </DialogActions>
        </Dialog>

    );

}

export default ConfirmMarketDialog;