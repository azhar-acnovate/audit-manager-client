import { Fade } from "@mui/material"
import React from "react"

const FadeInComponent = ({ visible, child, replacement,timeout=1000 }) => {
  return (
    visible ?
      child
      :
      <Fade in={!visible} timeout={timeout}>
        {replacement}
      </Fade>
  )
};

export default FadeInComponent;
