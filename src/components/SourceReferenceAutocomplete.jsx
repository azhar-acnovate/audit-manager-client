import { Autocomplete, createFilterOptions, FormControl, FormHelperText, IconButton, TextField } from "@mui/material";
import React from "react";
import ArgonBox from "./ArgonBox";
import SourceReferenceObjectServiceAPI from "../rest-services/source-reference-object-service";
import { Close } from "@mui/icons-material";
import { debounce } from "lodash";

const SourceReferenceAutocomplete = ({ defaultValue, onChange, helperText, error, multiple, onClear }) => {
  const [value, setValue] = React.useState(multiple ? [] : null);
  const [options, setOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(`${defaultValue} defaultValue`)
  const [inputValue, setInputValue] = React.useState(defaultValue!=null?`${defaultValue}`:"");

  // Debounced API call
  const fetchData = React.useMemo(
    () =>
      debounce(async (searchQuery) => {
        setIsLoading(true);
        try {
          const response = await SourceReferenceObjectServiceAPI.findPagable(1, searchQuery, 50);
          setOptions(response.data.content || []);
        } catch (e) {
          console.error("Error fetching data:", e);
        } finally {
          setIsLoading(false);
        }
      }, 300),
    []
  );

  React.useEffect(() => {
    if (inputValue.trim()) {
      fetchData(inputValue);
    } else {
      setOptions([]); // Clear options when input is empty
    }

    return () => fetchData.cancel(); // Clean up debounced calls
  }, [inputValue, fetchData]);

  // Set default values when options are loaded
  React.useEffect(() => {
    if (defaultValue != null) {
      if (multiple) {
        setValue(options.filter((obj) => defaultValue.includes(obj.id)));
      } else {
        setValue(options.find((obj) => obj.id.toString() === defaultValue.toString()));
      }
    }
  }, [defaultValue, multiple, options]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleClear = () => {
    setInputValue("");
    setValue(multiple ? [] : null);
    onClear?.();
  };

  return (
    <Autocomplete
      multiple={multiple}
      clearIcon={
        <IconButton
          onClick={handleClear}
          sx={{
            width: "1.5rem",
            height: "1.5rem",
          }}
        >
          <Close />
        </IconButton>
      }
      loading={isLoading}
      freeSolo
      value={value}
      noOptionsText="No data"
      options={options.sort((a, b) => -b.sourceReferenceName.localeCompare(a.sourceReferenceName))}
      onChange={(event, newValue) => {
        setValue(newValue);
        onChange?.(newValue); // Pass selected value to parent
      }}
      onInputChange={handleInputChange}
      getOptionLabel={(option) =>
        `${option.sourceReferenceName || ""}-${option.sourceReferenceKey || ""}`
      }
      renderInput={(params) => (
        <ArgonBox mb={2}>
          <FormControl error={error} fullWidth>
            <TextField
              {...params}
              placeholder="Search Audit Preparation"
              error={error}
              InputProps={{
                ...params.InputProps,
                sx: {
                  height: "45px",
                  paddingRight: "8px",
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
  );
};

export default SourceReferenceAutocomplete;
