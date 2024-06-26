import React, { Fragment, useEffect } from 'react';

import DefaultAppBar from '../components/DefaultAppBar';
import { styled } from '@mui/styles';
import { Route, Routes, useLocation } from 'react-router';
import Home from './Home';
import Heroes from './Heroes';
import About from './Abouts';
import Items from './Items';
import { initGA, pageView } from '../services/tracking';
import Roadmap from './Roadmap';

export default function Application() {

    const Main = styled('div')(({ theme }) => ({
        marginTop: 67,
        background: "url('imgs/pattern.jpg') left top repeat",
        [theme.breakpoints.down('md')]: {
            marginTop: 59,
        },

    }));

    const Footer = styled('footer')(({ theme }) => ({
        background: 'url("imgs/footer.png") repeat-x',
        width: '100%',
        height: '67px',
        backgroundSize: 'contain',
        [theme.breakpoints.down('sm')]: {
            backgroundSize: 'cover',
            height: '59px',
        },
    }));



    const SubMain = styled('div')(({ theme }) => ({
        background: "url('imgs/feathers_background.png') left top repeat-x, linear-gradient(to bottom, rgb(14,192,241), rgba(255,255,255, 0)) no-repeat",
        backgroundSize: 'auto 200px',
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 'calc(100vh - 164px)',
        [theme.breakpoints.down('md')]: {
            paddingTop: 10,
            paddingLeft: 5,
            paddingRight: 5,
            minHeight: 'calc(100vh - 128px)',
        },
    }));

    const location = useLocation();

    useEffect(() => {
        initGA();
        pageView({ pathname: '/', search: '' });

        return () => {

        }
    }, []);

    useEffect(() => {
        console.log(location);
        pageView(location);

        return () => {

        }
    }, [location])

    useEffect(() => {
        if (location.hash === '') {
            window.scrollTo(0, 0);
        } else {
            setTimeout(() => {
                const id = location.hash.split('#')[location.hash.split('#').length - 1];
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView();
                }
            }, 0);
        }

        return () => {

        }
    }, [location.pathname, location.hash, location.key]);

    return (
        <Fragment>
            <DefaultAppBar />
            <Main>
                <SubMain >
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/hens" element={<Heroes />} />
                        <Route exact path="/items" element={<Items />} />
                        <Route exact path="/roadmap" element={<Roadmap />} />
                        <Route exact path="/about" element={<About />} />
                    </Routes>
                </SubMain>
                <Footer />
            </Main>
        </Fragment>
    );
}