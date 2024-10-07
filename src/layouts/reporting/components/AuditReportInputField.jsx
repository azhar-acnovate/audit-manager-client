import React from "react"
import ArgonBox from "../../../components/ArgonBox";
import ArgonInput from "../../../components/ArgonInput";
import CustomLabel from "./CustomLabel";

const AuditReportInputField = ({ placeholder, fieldName, validator }) => {
    let error = validator.errors[fieldName];
    return (
       
            <ArgonBox mb={2}>
                 <CustomLabel>{placeholder}</CustomLabel>
                <ArgonInput
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
      
    )
};

export default AuditReportInputField;
