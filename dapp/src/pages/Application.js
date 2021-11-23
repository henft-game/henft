import React, { Fragment } from 'react';

import DefaultAppBar from '../components/DefaultAppBar';
import { makeStyles } from '@mui/styles';
import { Route, Routes } from 'react-router';
import Home from './Home';
import Heroes from './Heroes';

export default function Application() {


    const useStyles = makeStyles({
        main: {
            marginTop: 67,
            background: "url('imgs/pattern.jpg') left top repeat",
        },
        subMain: {
            background: "url('imgs/feathers_background.png') left top repeat-x, linear-gradient(to bottom, rgb(14,192,241), rgba(255,255,255, 0)) no-repeat",
            backgroundSize: 'auto 200px',
            paddingTop: 30,
            minHeight: 500,
        },
    });

    const classes = useStyles();

    return (
        <Fragment>
            <DefaultAppBar />
            <div className={classes.main}>
                <div className={classes.subMain}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/hens" element={<Heroes />} />
                    </Routes>
                </div>
            </div>
        </Fragment>
    );
}