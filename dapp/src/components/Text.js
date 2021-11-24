import React, { Fragment } from 'react';
import { Typography } from "@mui/material";

const Text = (props) => {

    return (
        <Fragment>
            {!!props.label ?
                <Typography sx={{ fontSize: "12px" }}>
                    <span>{props.label}{!!props.showSeparator ? '' : ': '}</span>{props.value}
                </Typography>
                :
                <Typography sx={{ color: props.color, fontSize: "12px" }}>{props.value}</Typography>
            }
        </Fragment>
    );

};

export default Text;