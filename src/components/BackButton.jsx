import React from "react"
import { useNavigate } from "react-router-dom";
import ArgonButton from "./ArgonButton";

const BackButton = ({ sx = { width: 30 }, color = "warning" }) => {
    let navigate = useNavigate();
    return (
        <ArgonButton sx={sx} color={color} onClick={() => navigate(-1)}>Back</ArgonButton>
    );
};

export default BackButton;