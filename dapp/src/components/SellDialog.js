import React, { forwardRef, useState} from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';


const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SellDialog = (props) => {

    const [value, setValue] = useState(1.0);

    return (

        <Dialog scroll="body" open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
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