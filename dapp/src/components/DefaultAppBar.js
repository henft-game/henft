import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { makeStyles, styled } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Web3Context } from '../providers/Web3Provider';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton';
import MobileMenu from '../components/MobileMenu';

export default function DefaultAppBar(props) {


    const Logo = styled('img')(({ theme }) => ({
        width: 240,
        position: 'fixed',
        marginLeft: -120,
        left: '50%',
        top: '1.5%',
        [theme.breakpoints.down('md')]: {
            width: 120,
            position: '',
            left: 0,
            top: 0,
            margin: 5,
        },
    }));

    const LinkMenu = styled(Link)(({ theme }) => ({
        borderRadius: 0,
        padding: 10,
        borderRight: "3px solid #61422D",
        textDecoration: 'none',
        color: "#61422D",
        "&:hover": {
            textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff",
        },
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 5,
            paddingRight: 5,
            fontSize: 12,
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    }));

    const OpenMenuButton = styled(IconButton)(({ theme }) => ({
        "&&": {
            position: 'fixed',
            right: 0,
            padding: 10,
            background: '#DCC1A1',
            borderTop: '3px solid #61422D',
            borderBottom: '3px solid #61422D',
            borderLeft: '3px solid #61422D',
            borderRadius: 0,
            display: 'none',
        },
        "&&:hover": {
            background: '#DCC1A1',
        },
        [theme.breakpoints.down('md')]: {
            "&&": {
                top: 64,
                display: 'inline-flex',
            },
        },
        [theme.breakpoints.down('md')]: {
            "&&": {
                top: 56,
                display: 'inline-flex',
            },
        },
    }));


    const ToolbarMenu = styled(Toolbar)(({ theme }) => ({
        [theme.breakpoints.down('lg')]: {
            "&&": {
                padding: 0,
            }
        },
    }));

    const AppBarMenu = styled(AppBar)(({ theme }) => ({
        "&&": {
            height: 67,
        },
        [theme.breakpoints.down('md')]: {
            "&&": {
                height: 59,
            }
        },
    }));

    const useStyles = makeStyles({

        lastMenu: {
            borderRight: "0px",
        },

        menuOpened: {
            "&&": {
                right: 253,
            }
        },

    });

    const classes = useStyles();

    const { accounts } = React.useContext(Web3Context);

    const shortAccount = function (account) {
        return `${account.substr(0, 4)}...${account.substr(-3)}`;
    }

    const login = async function () {
        await window.ethereum.send('eth_requestAccounts');
    }

    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    const toggleMobileMenu = function () {
        setMobileMenuOpened(prev => !prev);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBarMenu position="fixed" sx={{ background: "#DCC1A1", borderBottom: "3px solid #61422D", color: "#61422D" }}>
                <ToolbarMenu>
                    <Logo alt="logo" src="imgs/logo.png" />
                    <LinkMenu to="/">Home</LinkMenu>
                    <LinkMenu to="/hens">Hens</LinkMenu>
                    <LinkMenu to="/roadmap">Roadmap</LinkMenu>
                    <LinkMenu to="/history">History</LinkMenu>
                    <LinkMenu className={classes.lastMenu} to="/about">About</LinkMenu>
                    <Box sx={{ flexGrow: 1 }} />
                    {!!accounts && !!accounts[0] ?
                        <Button sx={{ color: '#61422D' }} startIcon={<Avatar sx={{ width: '33px', heigth: '38px' }} src={'imgs/connected.png'} />}>{shortAccount(accounts[0])}</Button>
                        :
                        <Button sx={{ color: '#61422D' }} onClick={login} startIcon={<Avatar sx={{ width: '33px', heigth: '38px' }} src={'imgs/no_connection.png'} />}>No Wallet Connected</Button>
                    }
                    <OpenMenuButton className={mobileMenuOpened ? classes.menuOpened : null} onClick={toggleMobileMenu}>
                        <MenuOpenIcon />
                    </OpenMenuButton>
                </ToolbarMenu>
            </AppBarMenu>
            <MobileMenu opened={mobileMenuOpened} toggle={toggleMobileMenu} />
        </Box>
    );
}