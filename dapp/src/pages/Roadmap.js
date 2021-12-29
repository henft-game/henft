import React from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/styles';

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

    return (
        <RoadmapBox>
            <Grid container>
                <Grid item sx={{ margin: 'auto', padding: '10px', borderRadius: '4px' }} xs={12} md={10} lg={8} xl={6}>
                    <Img src="imgs/roadmap.png" alt="roadmap" />
                </Grid>
            </Grid>
        </RoadmapBox>
    );
}

export default Roadmap;