import React from "react";
import { Grid, FormControl, MenuItem, Select, Typography } from "@mui/material";
import ArgonBox from "../../../components/ArgonBox";
import ArgonInput from "../../../components/ArgonInput";

const UserCreationInputField = ({ placeholder, fieldName, type, value, validator, onChange, options }) => {
    let error = validator.errors[fieldName];

    const isSelect = type === "select";

    return (
        <Grid item xs={12} sm={6} md={4}>
            <ArgonBox mb={0.5}>
                {isSelect ? (
                    
      <FormControl sx={{ m: 0, width: 390, mt: 1 }}>
        <Select
                 value={value || ''}
                 onChange={onChange}
                 displayEmpty
                 inputProps={{ 'aria-label': 'Without label' }}
        >
             <MenuItem disabled value="">
            <Typography sx={{color: 'lightgray', opacity: 1 ,fontSize: '14px'}}>{placeholder}</Typography>
          </MenuItem>
         {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
        </Select>
      </FormControl>
    
                ) : (
                    <ArgonInput
                        type={type || "text"}
                        id={fieldName}
                        name={fieldName}
                        placeholder={placeholder}
                        size="large" // Ensure consistent input size
                        helperText={error}
                        error={Boolean(error)}
                        onChange={(e) => validator.handleChange(fieldName, e.target.value)}
                        value={value || ''}
                    />
                )}
            </ArgonBox>
        </Grid>
    );
};

export default UserCreationInputField;
