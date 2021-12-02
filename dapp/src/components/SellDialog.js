import React, { forwardRef, useState } from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SellDialog = (props) => {

    const [value, setValue] = useState(1.0);

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
                    Define the price of hero to sell.
                </DialogContentText>
                <TextField autoFocus margin="dense" id="price"
                    value={value} autoComplete="false"
                    onChange={(e) => { setValue(e.target.value) }}
                    label="Price" type="number" fullWidth variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={() => { props.allowBuy(value + '') }}>Allow Sell</Button>
            </DialogActions>
        </Dialog>

    );

}

export default SellDialog;