import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";

const StyledSelectRoot = styled(Select)(({ theme, ownerState }) => {
  const { palette, typography, functions, borders } = theme;
  const { size, error, success, darkMode } = ownerState;

  const { inputColors, white, dark, text } = palette;
  const { pxToRem } = functions;
  const { size: fontSize } = typography;
  const { borderRadius } = borders;

  // Reusing size styles
  const smallStyles = {
    fontSize: fontSize.xs,
    padding: `${pxToRem(4)} ${pxToRem(12)}`,
  };

  const largeStyles = {
    padding: pxToRem(12),
  };
  const mediumStyles = {
    padding: pxToRem(14),
  };

  return {
    backgroundColor: white.main,
   // border: `1px solid ${inputColors.borderColor.main}`,
    borderRadius: borderRadius.md,
    color: darkMode ? white.main : dark.main,
    padding: `${pxToRem(10)} ${pxToRem(12)}`,

    ...(size === "small" && smallStyles),
    ...(size === "large" && largeStyles),
    ...(size === "medium" && mediumStyles),
    ...(error && { borderColor: inputColors.error }),
    ...(success && { borderColor: inputColors.success }),

    "& .MuiSelect-select": {
      padding: 0,
      color: darkMode ? white.main : dark.main,

      "&::placeholder": {
        color: darkMode ? white.main : text.main,
      },
    },
  };
});

export default StyledSelectRoot;