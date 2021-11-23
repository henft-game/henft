import React from 'react';
import { Drawer, List, ListItem } from '@mui/material';
import { styled } from '@mui/styles';
import { Link } from 'react-router-dom';

export default function MobileMenu({ opened, toggle }) {

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
            <List sx={{ marginTop: '57px', width: '250px', height: "100%", borderLeft: '3px solid #61422D', background: '#DCC1A1' }}>
                <ListItem><LinkMenu onClick={toggle} to="/">Home</LinkMenu></ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/hens">Hens</LinkMenu></ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/">Roadmap</LinkMenu></ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/">History</LinkMenu></ListItem>
                <ListItem><LinkMenu onClick={toggle} to="/">About</LinkMenu></ListItem>
            </List>
        </Drawer>
    )
}