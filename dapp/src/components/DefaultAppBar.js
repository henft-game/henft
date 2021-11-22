import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Web3Context } from '../providers/Web3Provider';

export default function DefaultAppBar() {


    const useStyles = makeStyles({
        appMenu: {
            borderRadius: 0,
            padding: 10,
            borderRight: "3px solid #61422D",
            textDecoration: 'none',
            color: "#61422D",
            "&:hover": {
                textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff",
            }
        },
    });

    const classes = useStyles();

    const { accounts } = React.useContext(Web3Context);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: "#DCC1A1", borderBottom: "3px solid #61422D", color: "#61422D" }}>
                <Toolbar>
                    <Link className={classes.appMenu} to="/">Home</Link>
                    <Link className={classes.appMenu} to="/hens">Hens</Link>
                    <Link className={classes.appMenu} to="/">Roadmap</Link>
                    <Link className={classes.appMenu} to="/">History</Link>
                    <Link className={classes.appMenu} to="/">About</Link>
                    {!!accounts &&
                        <Button>{accounts[0]}</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}