import React from "react";
import ArgonBox from "../../../components/ArgonBox";
import ArgonInput from "../../../components/ArgonInput";
import CustomLabel from "./CustomLabel";

const AuditReportInputField = ({ placeholder, fieldName, value, error, helperText, onChange }) => {
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
                helperText={helperText}
                error={error}
                onChange={(e) => onChange(e.target.value)}
                value={value || ''}
            />
        </ArgonBox>
    );
};

export default AuditReportInputField;
