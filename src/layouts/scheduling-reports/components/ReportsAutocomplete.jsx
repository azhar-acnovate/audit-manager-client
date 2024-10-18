import React from "react"
import AuditReportServiceAPI from "../../../rest-services/audit-report-service";
import { Autocomplete, createFilterOptions, FormControl, FormHelperText, TextField } from "@mui/material";
import ArgonBox from "../../../components/ArgonBox";

const ReportAutocomplete = ({ defaultValue, onChange, helperText, error, multiple }) => {
    const [value, setValue] = React.useState(multiple ? [] : null);
    const [options, setOptions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await AuditReportServiceAPI.findAll();
                setOptions(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    React.useEffect(() => {
        if (defaultValue != null) {
            if (multiple) {
                setValue(options.filter(obj => defaultValue.includes(obj.id)));
            } else {
                setValue(options.find(obj => obj.id.toString() === defaultValue.toString()));
            }

        }
    }, [defaultValue, setValue, multiple, options]);
    const OPTIONS_LIMIT = 5;
    const defaultFilterOptions = createFilterOptions();

    const filterOptions = (options, state) => {
        return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    };
    return (
        <Autocomplete
            multiple={multiple}
            loading={isLoading}
            freeSolo
            filterOptions={filterOptions}
            value={value}
            noOptionsText="No data"
            options={options}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            getOptionLabel={(option) => option.reportName}
            renderInput={(params) => (
                <ArgonBox mb={2}>
                    <FormControl error={error} fullWidth>
                        <TextField
                            {...params}
                            placeholder="Search Audit Report"
                            error={error} // Pass error prop to TextField
                            InputProps={{
                                ...params.InputProps,
                                sx: {
                                    height: "45px",
                                    paddingRight: "8px",
                                    // '& .MuiOutlinedInput-notchedOutline': {
                                    //     borderColor: error ? "red" : "initial", // Customize border color here
                                    // }
                                },
                            }}
                            inputProps={{
                                ...params.inputProps,
                                style: {
                                    height: "24px",
                                    padding: "8px",
                                },
                            }}
                        />{helperText && <FormHelperText>{helperText}</FormHelperText>}
                    </FormControl>
                </ArgonBox>
            )}
        ></Autocomplete>
    )
};

export default ReportAutocomplete;
