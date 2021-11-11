import React, { Fragment } from 'react';
import { Typography } from "@mui/material";

const Text = (props) => {

    return (
        <Fragment>
            {!!props.label ?
                <Typography>
                    <span >{props.label}{!!props.showSeparator ? '' : ': '}</span>{props.value}
                </Typography>
                :
                <Typography sx={{color: props.color}}>{props.value}</Typography>
            }
        </Fragment>
    );

};

export default Text;