import { Link, Typography } from "@mui/material";
import React from "react"

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" target="_blank" href={process.env.REACT_APP_WEBSITE_URL}>
                {process.env.REACT_APP_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
};

export default Copyright;
