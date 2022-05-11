import React, { forwardRef, useEffect, useState } from 'react';

import { Slide, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Button, Typography, InputAdornment } from '@mui/material';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SellDialog = (props) => {

    const [value, setValue] = useState(0.1);
    const [transactionStarted, setTransactionStarted] = useState(false);

    const allowBuy = () => {
        props.allowBuy(value + '');
        setTransactionStarted(true);
    }

    const resetState = () => {
        setTransactionStarted(false);
        props.handleClose();
    }

    useEffect(() => {
        setTransactionStarted(false);
    }, [props.open]);

    return (

        <Dialog PaperProps={{
            style: {
                border: '4px solid #61422D',
                borderRadius: 4,
                background: '#FEEDD9',
                color: '#61422D',
                margin: '0px',
                maxWidth: '400px'
            }
        }}
            scroll="body" maxWidth="false"
            open={props.open}
            onClose={(_, reason) => {
                if (reason !== 'backdropClick') {
                    resetState();
                }
            }}
            TransitionComponent={Transition}>
            <DialogContent>
                <DialogContentText>
                    <Typography component="span">Define the price of hero to sell.</Typography>
                    {transactionStarted &&
                        <Typography component="span" sx={{ display: 'block', fontSize: '8px', padding: '5px' }}>
                            We are sending the request to the blockchain, this may take a while. If it takes too long, please refresh the page.
                        </Typography>
                    }
                </DialogContentText>
                <TextField
                    disabled={transactionStarted}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{process.env.REACT_APP_SYMBOL}</InputAdornment>,
                    }}
                    autoFocus margin="dense" id="price"
                    value={value} autoComplete="false"
                    onChange={(e) => { setValue(e.target.value) }}
                    label="Price" type="number" fullWidth variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button disabled={transactionStarted} onClick={resetState}>Cancel</Button>
                <Button disabled={transactionStarted} onClick={allowBuy}>Allow Sell</Button>
            </DialogActions>
        </Dialog>

    );

}

export default SellDialog;