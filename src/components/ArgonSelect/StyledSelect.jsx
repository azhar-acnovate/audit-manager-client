import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import StyledSelectRoot from "./StyledSelectRoot";
import { FormControl, FormHelperText } from "@mui/material";
import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useArgonController } from "../../context";
const StyledSelect = forwardRef(({ size, error, success, disabled, helperText, ...rest }, ref) => {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <FormControl error={error} fullWidth>
      <StyledSelectRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled, darkMode }} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
// Setting default values for the props of ArgonInput
StyledSelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the ArgonInput
StyledSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};



export default StyledSelect;