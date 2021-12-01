import React, { forwardRef, useEffect, useState } from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';
import Web3 from 'web3';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BidDialog = (props) => {

    const [value, setValue] = useState();

    useEffect(() => { setValue(Web3.utils.fromWei(props.minBid)) }, [props.minBid])

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
            <DialogContent>
                <DialogContentText>
                    Create a new Bid to the Hero.
                </DialogContentText>
                <TextField autoFocus margin="dense" id="price"
                    value={value} autoComplete="false"
                    onChange={(e) => { setValue(e.target.value) }}
                    label="Bid Value" type="number" fullWidth variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={() => { props.bid(value + '') }}>Send Bid</Button>
            </DialogActions>
        </Dialog>

    );

}

export default BidDialog;