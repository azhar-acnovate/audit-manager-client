import { Autocomplete, createFilterOptions, FormControl, FormHelperText, TextField } from "@mui/material";
import React from "react"
import ArgonBox from "./ArgonBox";
import SourceReferenceObjectServiceAPI from "../rest-services/source-reference-object-service";

const SourceReferenceAutocomplete = ({ defaultValue, onChange, helperText, error }) => {
    const [value, setValue] = React.useState(null);
    const [options, setOptions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await SourceReferenceObjectServiceAPI.findAll();
                if(defaultValue!=null){
                    setValue(response.data.find(obj => obj.id.toString() === defaultValue.toString()));
                }
              
                setOptions(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [defaultValue, setValue]);

    const OPTIONS_LIMIT = 3;
    const defaultFilterOptions = createFilterOptions();

    const filterOptions = (options, state) => {
        return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    };

    return (
        <Autocomplete
            sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: error ? "error.main" : "info.main"
                },
            }}
            loading={isLoading}
            freeSolo
            filterOptions={filterOptions}
            value={value}
            noOptionsText="No locations"
            options={options}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            getOptionLabel={(option) => option.sourceReferenceName + '-' + option.sourceReferenceKey}
            renderInput={(params) => (
                <ArgonBox mb={2}>
                    <FormControl error={error} fullWidth>
                        <TextField
                            {...params}
                            placeholder="Search Source Reference"
                            error={error} // Pass error prop to TextField
                            InputProps={{
                                ...params.InputProps,
                                sx: {
                                    height: "45px",
                                    paddingRight: "8px",
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: error ? "red" : "initial", // Customize border color here
                                    }
                                },
                            }}
                            inputProps={{
                                ...params.inputProps,
                                style: {
                                    height: "24px",
                                    padding: "8px",
                                },
                            }}
                        />
                        {helperText && <FormHelperText>{helperText}</FormHelperText>}
                    </FormControl>
                </ArgonBox>
            )}
        />
    )
};

export default SourceReferenceAutocomplete;
