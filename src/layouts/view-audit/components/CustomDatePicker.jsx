import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";
import {eventOccurenceDateFormat } from "../../../utils/DateFormatter";

const CustomDatepicker = ({ defaultValue, onChange,marginLeft=50 }) => {
  return (
    <DatePicker
      format="LL"
      onChange={onChange}
      value={defaultValue ? moment(defaultValue, eventOccurenceDateFormat) :moment()} // Use Moment object
      sx={{
        width: "100%",
        '& .MuiInputBase-root': {
          fontSize: '1.5rem', // Increase font size
          padding: '12px',    // Adjust padding for larger input
        },
        '& .MuiInputAdornment-root': {
          marginLeft: `${marginLeft}px`,  // Add space between text and icon
        },
        '& .MuiSvgIcon-root': {
          fontSize: '2rem',   // Increase icon size
        },
      }}
    />
  );
};

export default CustomDatepicker;
