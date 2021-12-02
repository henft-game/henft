import React, { forwardRef } from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmMarketDialog = (props) => {

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