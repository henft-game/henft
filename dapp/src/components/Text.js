import React, { Fragment } from 'react';
import { Typography } from "@material-ui/core";

const Text = (props) => {

    return (
        <Fragment>
            {!!props.label ?
                <Typography >
                    <span >{props.label}{!!props.showSeparator ? '' : ': '}</span>{props.value}
                </Typography>
                :
                <Typography>{props.value}</Typography>
            }
        </Fragment>
    );

};

export default Text;