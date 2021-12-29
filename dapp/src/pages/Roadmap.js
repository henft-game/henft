import React from 'react';
import { Box, Grid, Tooltip, tooltipClasses } from '@mui/material';
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

    const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
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
                        <HelpIcon sx={{ position: 'absolute', top: '9%', left: '61%', zIndex: '1000', fontSize: '3vw' }} />
                    </CustomTooltip>
                    <CustomTooltip title="">
                        <HelpIcon sx={{ position: 'absolute', top: '18.7%', left: '92%', zIndex: '1000', fontSize: '3vw' }} />
                    </CustomTooltip>
                    <CustomTooltip title="A whitepaper will be added with all the details and plans for season 1 and intentions for upcoming seasons.">
                        <HelpIcon sx={{ position: 'absolute', top: '30.8%', left: '60.5%', zIndex: '1000', fontSize: '3vw' }} />
                    </CustomTooltip>
                    <CustomTooltip title="A new page will be added explaining all the calculations and rules of the game.">
                        <HelpIcon sx={{ position: 'absolute', top: '42.5%', left: '41.5%', zIndex: '1000', fontSize: '3vw' }} />
                    </CustomTooltip>
                    <CustomTooltip title="Equipment system will be added in the game, allowing Hens to use equipment that will give bonuses during battles.">
                        <HelpIcon sx={{ position: 'absolute', top: '54%', left: '46.5%', zIndex: '1000', fontSize: '3vw' }} />
                    </CustomTooltip>
                    <CustomTooltip title="Total of 200 unique hens ready.">
                        <HelpIcon sx={{ position: 'absolute', top: '73.8%', left: '43%', zIndex: '1000', fontSize: '3vw' }} />
                    </CustomTooltip>
                    <CustomTooltip title="Statistics related to HeNFT will be added to the home page.">
                        <HelpIcon sx={{ position: 'absolute', top: '66.6%', left: '87%', zIndex: '1000', fontSize: '3vw' }} />
                    </CustomTooltip>
                    <CustomTooltip title="A new game feature will be added, this will allow players to 'rent' their Hens, more details will be added with whitepaper.">
                        <HelpIcon sx={{ position: 'absolute', top: '84.5%', left: '55%', zIndex: '1000', fontSize: '3vw' }} />
                    </CustomTooltip>

                </Grid>
            </Grid>
        </RoadmapBox>
    );
}

export default Roadmap;