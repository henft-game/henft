import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
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

        lastMenu: {
            borderRadius: 0,
            padding: 10,
            borderRight: "0px",
            textDecoration: 'none',
            color: "#61422D",
            "&:hover": {
                textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff",
            }
        },

        logo: {
            width: 240,
            position: 'fixed',
            marginLeft: -120,
            left: '50%',
            top: '1.5%',
        },
    });

    const classes = useStyles();

    const { web3, accounts } = React.useContext(Web3Context);

    const shortAccount = function (account) {
        return `${account.substr(0, 4)}...${account.substr(-3)}`;
    }

    const login = async function () {
        await window.ethereum.send('eth_requestAccounts');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: "#DCC1A1", borderBottom: "3px solid #61422D", color: "#61422D" }}>
                <Toolbar>
                    <img alt="logo" className={classes.logo} src="imgs/logo.png" />
                    <Link className={classes.appMenu} to="/">Home</Link>
                    <Link className={classes.appMenu} to="/hens">Hens</Link>
                    <Link className={classes.appMenu} to="/">Roadmap</Link>
                    <Link className={classes.appMenu} to="/">History</Link>
                    <Link className={classes.lastMenu} to="/">About</Link>
                    <Box sx={{ flexGrow: 1 }} />
                    {!!accounts && !!accounts[0] ?
                        <Button sx={{ color: '#61422D' }} startIcon={<Avatar sx={{ width: '33px', heigth: '38px' }} src={'imgs/connected.png'} />}>{shortAccount(accounts[0])}</Button>
                        :
                        <Button sx={{ color: '#61422D' }} onClick={login} startIcon={<Avatar sx={{ width: '33px', heigth: '38px' }} src={'imgs/no_connection.png'} />}>No Wallet Connected</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}