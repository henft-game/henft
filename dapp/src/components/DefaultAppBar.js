import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { makeStyles, styled } from '@mui/styles';
import { NavLink } from 'react-router-dom';
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
        top: -64,
        [theme.breakpoints.down('md')]: {
            width: 120,
            position: '',
            left: 0,
            top: -37,
            margin: 5,
        },
    }));

    const LinkMenu = styled(NavLink)(({ theme }) => ({
        borderRadius: 0,
        padding: 10,
        borderRight: "4px solid #61422D",
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

    const RightBox = styled(Box)(({ theme }) => ({
        "&&": {
            display: 'inline-flex',
        },
        [theme.breakpoints.down('md')]: {
            "&&": {
                display: 'none',
            },
        },
    }));

    const OpenMenuButton = styled(IconButton)(({ theme }) => ({
        "&&": {
            position: 'fixed',
            right: 0,
            padding: 10,
            background: '#DCC1A1',
            borderTop: '4px solid #61422D',
            borderBottom: '4px solid #61422D',
            borderLeft: '4px solid #61422D',
            borderRadius: 4,
            display: 'none',
        },
        "&&:hover": {
            background: '#DCC1A1',
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

        menuActived: {
            textShadow: "0 0 7px #CCC, 0 0 10px #CCC, 0 0 21px #CCC",
        },

        menuOpened: {
            "&&": {
                right: 254,
            }
        },

    });

    const classes = useStyles();

    const { data } = useContext(Web3Context);

    const shortAccount = function (account) {
        return `${account.substr(0, 4)}...${account.substr(-3)}`;
    }

    const login = async function () {

        if (window.ethereum) {
            try {
                // check if the chain to connect to is installed
                if (window.ethereum.chainId === '0x61') {
                    await window.ethereum.send('eth_requestAccounts');
                } else {

                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
                    });
                }
            } catch (error) {
                // This error code indicates that the chain has not been added to MetaMask
                // if it is not, then install it into the user MetaMask
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x61',
                                    chainName: 'https://testnet.bscscan.com',
                                    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                                    nativeCurrency: {
                                        symbol: 'BNB'
                                    }
                                },
                            ],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                }
                console.error(error);
            }
        } else {
            alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }
    }

    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    const toggleMobileMenu = function () {
        setMobileMenuOpened(prev => !prev);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBarMenu position="fixed" sx={{ background: "#DCC1A1", borderBottom: "4px solid #61422D", color: "#61422D" }}>
                <ToolbarMenu>
                    <Logo alt="logo" src="imgs/logo.png" />
                    <LinkMenu style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none', })} to="/">Home</LinkMenu>
                    <LinkMenu style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none', })} to="/hens">Hens</LinkMenu>
                    <LinkMenu style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none', })} to="/roadmap">Roadmap</LinkMenu>
                    <LinkMenu style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none', })} to="/items">Items</LinkMenu>
                    <LinkMenu style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none', })}
                        className={classes.lastMenu} to="/about">About</LinkMenu>
                    <Box sx={{ flexGrow: 1 }} />
                    <RightBox>
                        {!!data?.accounts && !!data?.accounts[0] ?
                            <Button sx={{ color: '#61422D' }} startIcon={<Avatar sx={{ width: '33px', heigth: '38px' }} src={'imgs/connected.png'} />}>{shortAccount(data?.accounts[0])}</Button>
                            :
                            <Button sx={{ color: '#61422D' }} onClick={login} startIcon={<Avatar sx={{ width: '33px', heigth: '38px' }} src={'imgs/no_connection.png'} />}>No Wallet Connected</Button>
                        }
                    </RightBox>
                    <OpenMenuButton className={mobileMenuOpened ? classes.menuOpened : null} onClick={toggleMobileMenu}>
                        <MenuOpenIcon />
                    </OpenMenuButton>
                </ToolbarMenu>
            </AppBarMenu>
            <MobileMenu opened={mobileMenuOpened} login={login} shortAccount={shortAccount} data={data} toggle={toggleMobileMenu} />
        </Box>
    );
}