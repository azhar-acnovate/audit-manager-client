
import React from "react"
import ArgonButton from "../../../components/ArgonButton";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
// import colors from "../../../assets/theme/base/colors";
const ActionButton = ({ item }) => {
    // const { gradients } = colors;


    return (
        <Grid
            container
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* <ArgonButton
                size="small"

                sx={{ width: 40, fontSize: 10, mr: 2 }}
                onClick={onClick}
                color={isOpened ? "error" : "success"} >
                {isOpened ? 'Close' : 'History'}
            </ArgonButton> */}

            <ArgonButton
                component={Link}
                color="info"
                size="small"
                sx={{
                    width: 40,
                    fontSize: 10,
                }}
                to={`/master-data-management/update/${btoa(`${item.id}`)}`}
            >
                Edit
            </ArgonButton>
        </Grid>
    )
};

export default ActionButton;
