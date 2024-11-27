import React from "react"
import ArgonTypography from "../../../components/ArgonTypography";

const CustomLabel = ({ children, fontSize = 15}) => {
  return (
    <ArgonTypography sx={{pb:2}} fontSize={fontSize}>
        {children}
    </ArgonTypography>
  )
};

export default CustomLabel;
