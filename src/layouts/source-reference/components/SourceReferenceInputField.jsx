import { Grid } from "@mui/material";
import React from "react"
import ArgonBox from "../../../components/ArgonBox";
import ArgonInput from "../../../components/ArgonInput";

const SourceReferenceInputField = ({ placeholder, fieldName, validator,...props }) => {
    let error = validator.errors[fieldName];
    return (
        <Grid item xs={2} sm={4} md={6} >
            <ArgonBox mb={2}>
                <ArgonInput
                    {...props}
                    key={`key-${fieldName}`}
                    type="text"
                    id={fieldName}
                    name={fieldName}
                    placeholder={placeholder}
                    size="large"
                    helperText={error}
                    error={Boolean(error)}
                    onChange={(e) => validator.handleChange(fieldName, e.target.value)}
                    value={validator.state[fieldName] || ''}
                />
            </ArgonBox>
        </Grid>
    )
};

export default SourceReferenceInputField;
