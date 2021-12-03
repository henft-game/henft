import React from 'react';
import { Avatar, Button, Drawer, List, ListItem } from '@mui/material';
import { styled } from '@mui/styles';
import { Link } from 'react-router-dom';

export default function MobileMenu({ opened, data, toggle, shortAccount, login }) {

    const LinkMenu = styled(Link)(({ theme }) => ({
        borderRadius: 0,
        padding: 10,
        textDecoration: 'none',
        color: "#61422D",
        "&:hover": {
            textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff",
        },
    }));

    return (
        <Drawer sx={{ zIndex: '1000' }}
            anchor="right"
            open={opened}
            onClose={toggle}
        >
            <List sx={{ marginTop: '57px', width: '250px', height: "100%", borderLeft: '4px solid #61422D', background: '#DCC1A1' }}>
                <ListItem>
                    {!!data?.accounts && !!data?.accounts[0] ?
                        <Button sx={{ color: '#61422D' }} startIcon={<Avatar sx={{ width: '33px', heigth: '38px' }} src={'imgs/connected.png'} />}>{shortAccount(data?.accounts[0])}</Button>
                        :
                        <Button sx={{ color: '#61422D' }} onClick={login} startIcon={<Avatar sx={{ width: '33px', heigth: '38px' }} src={'imgs/no_connection.png'} />}>No Wallet Connected</Button>
                    }
                </ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/">Home</LinkMenu></ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/hens">Hens</LinkMenu></ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/roadmap">Roadmap</LinkMenu></ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/items">Items</LinkMenu></ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/about">About</LinkMenu></ListItem>
            </List>
        </Drawer>
    )
}