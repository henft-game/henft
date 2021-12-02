import React, { forwardRef, useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Slide, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';


const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAuctionDialog = (props) => {

    const [minBid, setMinBid] = useState(1.0);
    const [auctionEnd, setAuctionEnd] = useState(new Date(new Date().getTime() + 120000));

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
                    Create a auction to sell your hero.
                </DialogContentText>
                <TextField autoFocus margin="dense" id="price"
                    value={minBid} autoComplete="false"
                    onChange={(e) => { setMinBid(e.target.value) }}
                    label="Minimum Bid" type="number" fullWidth variant="standard"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} fullWidth variant="standard" />}
                        label="Auction End"
                        disablePast
                        value={auctionEnd}
                        onChange={(newValue) => {
                            setAuctionEnd(newValue);
                        }}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={() => { props.createAuction(auctionEnd.getTime(), minBid + '') }}>Create Auction</Button>
            </DialogActions>
        </Dialog>

    );

}

export default CreateAuctionDialog;