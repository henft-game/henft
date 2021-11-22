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
        },
    });

    const classes = useStyles();

    return (
        <Fragment>
            <DefaultAppBar />
            <div className={classes.main}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/hens" element={<Heroes />} />
                </Routes>
            </div>
        </Fragment>
    );
}