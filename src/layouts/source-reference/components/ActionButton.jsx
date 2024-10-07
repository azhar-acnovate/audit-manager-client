import { Grid } from "@mui/material";
import React from "react"
import ArgonButton from "../../../components/ArgonButton";
import { Link } from "react-router-dom";

const ActionButton = ({item}) => {
  return (
    <>
      <Grid
            container
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <ArgonButton
                component={Link}
                color="info"
                size="small"
                sx={{
                    width: 40,
                    fontSize: 10,
                }}
                to={`./update/${btoa(`${item.id}`)}`}
            >
                Edit
            </ArgonButton>
        </Grid>
    </>
  )
};

export default ActionButton;
