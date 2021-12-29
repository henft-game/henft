import React from 'react';
import { Box, Grid, Tooltip, tooltipClasses, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import HelpIcon from '@mui/icons-material/Help';

const Roadmap = () => {

    const Img = styled('img')(({ theme }) => ({
        width: '100%',
    }));

    const RoadmapBox = styled(Box)(({ theme }) => ({
        "&&": {
            paddingTop: '100px',
            paddingBottom: '40px',

        },
    }));

    const CustomHelpIcon = styled(Typography)(({ theme }) => ({
        '&&': {
            position: 'absolute',
            background: '#302A25',
            color: '#F7E7D4',
            zIndex: '1000',
            fontSize: '3vw',
            padding: '7px 3px 3px 7px',
            margin: '0',
            lineHeight: '8vh',
            borderRadius: '4px',
        },
        [theme.breakpoints.down('sm')]: {
            '&&': {
                lineHeight: '3vh !important',
                fontSize: '5vw !important',
            }
        },
        [theme.breakpoints.up('xl')]: {
            '&&': {
                lineHeight: '9vh !important',
                fontSize: '2vw !important',
            }
        },
    }));


    const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} enterTouchDelay={0} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            lineHeight: '24px',
            fontSize: '15px',
            background: '#302A25',
        },
    });

    return (
        <RoadmapBox>
            <Grid container>
                <Grid item sx={{ margin: 'auto', padding: '10px', borderRadius: '4px', position: 'relative' }} xs={12} md={10} lg={8} xl={6}>
                    <Img src="imgs/roadmap.png" alt="roadmap" />
                    <CustomTooltip title="A new page will be added, it will contain the battle history, the leaderboard of the current month and the history of previous champions.">
                        <CustomHelpIcon sx={{ top: '9%', left: '61%', }}>?</CustomHelpIcon>
                    </CustomTooltip>
                    <CustomTooltip title="">
                        <CustomHelpIcon sx={{ top: '18.7%', left: '92%', }}>?</CustomHelpIcon>
                    </CustomTooltip>
                    <CustomTooltip title="A whitepaper will be added with all the details and plans for season 1 and intentions for upcoming seasons.">
                        <CustomHelpIcon sx={{ top: '30.8%', left: '60.5%', }}>?</CustomHelpIcon>
                    </CustomTooltip>
                    <CustomTooltip title="A new page will be added explaining all the calculations and rules of the game.">
                        <CustomHelpIcon sx={{ top: '42.5%', left: '41.5%', }}>?</CustomHelpIcon>
                    </CustomTooltip>
                    <CustomTooltip title="Equipment system will be added in the game, allowing Hens to use equipment that will give bonuses during battles.">
                        <CustomHelpIcon sx={{ top: '54%', left: '46.5%', }}>?</CustomHelpIcon>
                    </CustomTooltip>
                    <CustomTooltip title="Total of 200 unique hens ready.">
                        <CustomHelpIcon sx={{ top: '73.8%', left: '43%', }}>?</CustomHelpIcon>
                    </CustomTooltip>
                    <CustomTooltip title="Statistics related to HeNFT will be added to the home page.">
                        <CustomHelpIcon sx={{ top: '66.6%', left: '87%', }}>?</CustomHelpIcon>
                    </CustomTooltip>
                    <CustomTooltip title="A new game feature will be added, this will allow players to 'rent' their Hens, more details will be added with whitepaper.">
                        <CustomHelpIcon sx={{ top: '84.5%', left: '55%', }}>?</CustomHelpIcon>
                    </CustomTooltip>

                </Grid>
            </Grid>
        </RoadmapBox>
    );
}

export default Roadmap;