import React, { useEffect, useState } from "react";
import { Autocomplete, createFilterOptions, FormControl, FormHelperText, TextField } from "@mui/material";
import ArgonBox from "../../../components/ArgonBox";
import AuditReportServiceAPI from "../../../rest-services/audit-report-service";

const ReportAutocomplete = ({ defaultValue, onChange, helperText, error, multiple }) => {
    const [value, setValue] = useState(multiple ? [] : null);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                const response = await AuditReportServiceAPI.findAll();
                setOptions(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    useEffect(() => {
        if (defaultValue != null) {
            if (multiple) {
                setValue(options.filter((report) => defaultValue.includes(report.id)));
            } else {
                setValue(options.find((report) => report.id.toString() === defaultValue.toString()));
            }
        }
    }, [defaultValue, multiple, options]);

    const filterOptions = createFilterOptions({
        limit: 5,
    });

    return (
        <Autocomplete
            multiple={multiple}
            loading={isLoading}
            value={value}
            options={options}
            filterOptions={filterOptions}
            onChange={(event, newValue) => onChange(newValue)}
            getOptionLabel={(option) => option.reportName}
            noOptionsText="No data"
            renderInput={(params) => (
                <ArgonBox mb={2}>
                    <FormControl error={error} fullWidth>
                        <TextField
                            {...params}
                            placeholder="Search Audit Report"
                            error={error}
                            InputProps={{
                                ...params.InputProps,
                                sx: { height: "45px", paddingRight: "8px" },
                            }}
                            inputProps={{
                                ...params.inputProps,
                                style: { height: "24px", padding: "8px" },
                            }}
                        />
                        {helperText && <FormHelperText>{helperText}</FormHelperText>}
                    </FormControl>
                </ArgonBox>
            )}
        />
    );
};

export default ReportAutocomplete;
