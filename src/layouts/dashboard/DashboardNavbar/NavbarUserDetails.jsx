import React from "react"
import ArgonTypography from "../../../components/ArgonTypography";
import { Grid } from "@mui/material";
import pxToRem from "../../../assets/theme/functions/pxToRem";

const NavbarUserDetails = ({ light, transparentNavbar }) => {
    // Retrieve user details from localStorage
    const userDetail = JSON.parse(localStorage.getItem("userDetail")) || {};
    // Extract fullName and issuedAt
    const fullName = userDetail.fullName || "Guest";
    const role = userDetail.userRole || "Guest";
    const issuedAt = userDetail.issuedAt ? new Date(userDetail.issuedAt).toLocaleString() : "Unknown";
    return (
            <Grid pr={6} container direction="column">
            <ArgonTypography
                variant="button"
                fontWeight="medium"
                color={light && transparentNavbar ? "white" : "dark"}
                id="name"
            >
                Welcome {`${role.charAt(0).toUpperCase() + String(role).slice(1)}, ${fullName}`}
            </ArgonTypography>
            <ArgonTypography
                sx={{fontSize:pxToRem(11)}}
                variant="button"
                color={light && transparentNavbar ? "white" : "dark"}
                id="lastlogout"
            >
                Last Logged In: {issuedAt}
            </ArgonTypography>
        </Grid>
    )
};

export default NavbarUserDetails;
