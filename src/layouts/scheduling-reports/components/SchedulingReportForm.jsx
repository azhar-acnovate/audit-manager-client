import React, { useState } from "react";
import { Box, Card, TextField, FormControl, Select, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/system";
import ArgonButton from "../../../components/ArgonButton";  // Adjusted path
import ArgonTypography from "../../../components/ArgonTypography";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../../../components/toast/Toast";
import { validateSchedulingForm } from "../data/SchedulingReportValidation"; // Import validation

const StyledCard = styled(({ ...props }) => (
    <Card {...props}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center', height: '100%' }}>
            {props.children}
        </Box>
    </Card>
))(({ theme }) => ({
    width: '100%',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: theme.shadows[3],
    '&:hover': {
        boxShadow: theme.shadows[6],
    },
}));

const SchedulingReportForm = () => {
    const [reportName, setReportName] = useState("");
    const [recipients, setRecipients] = useState([""]);
    const [frequency, setFrequency] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [amPm, setAmPm] = useState("");
    const [errors, setErrors] = useState({});  // Track validation errors

    const navigate = useNavigate();
    const { showSuccessToast, showErrorToast } = useToast();

    const handleAddRecipient = () => {
        setRecipients([...recipients, ""]);
    };

    const handleRecipientChange = (index, value) => {
        const newRecipients = [...recipients];
        newRecipients[index] = value;
        setRecipients(newRecipients);
    };

    const handleRemoveRecipient = (index) => {
        if (recipients.length === 1) {
            // If there's only one recipient left, show an error and prevent removal
            showErrorToast("At least one recipient is required.");
            return;
        }
        const newRecipients = recipients.filter((_, i) => i !== index);
        setRecipients(newRecipients);
    };
    
    const handleSaveSchedule = () => {
        const formValues = {
            reportName,
            recipients,
            frequency,
            hour,
            minute,
            amPm,
        };

        const validationErrors = validateSchedulingForm(formValues);  // Call the validation function

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);  // Set the validation errors
            showErrorToast("All required fields must be completed with valid input before submitting.");
            return;
        }

        // If no errors, proceed to save the schedule
        console.log("Form Values:", formValues);

        showSuccessToast("Schedule saved successfully!");
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    return (
        <>
            <StyledCard>
                <ArgonTypography variant="h6">Report Name:</ArgonTypography>
                <TextField
                    placeholder="Report Name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    sx={{ width: '300px' }}
                    required
                    error={!!errors.reportName}  // Show error if exists
                    helperText={errors.reportName}  // Display validation error
                    InputLabelProps={{
                        shrink: false,
                    }}
                />
            </StyledCard>

            <Box sx={{ mb: 3 }} />

            <StyledCard>
                <ArgonTypography variant="h6">SCHEDULING</ArgonTypography>
                <Box sx={{ display: 'flex', alignItems: 'normal', gap: 2 }}>
                    <FormControl variant="outlined" sx={{ width: '120px' }} error={!!errors.frequency}>
                        <Select
                            displayEmpty
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            renderValue={
                                frequency !== "" ? undefined : () => <span style={{ color: 'lightgray' }}>Frequency</span>
                            }
                        >
                            <MenuItem value="DAILY">DAILY</MenuItem>
                            <MenuItem value="WEEKLY">WEEKLY</MenuItem>
                            <MenuItem value="MONTHLY">MONTHLY</MenuItem>
                        </Select>
                        <Box sx={{ color: 'red', fontSize: '0.75rem' }}>{errors.frequency}</Box>  {/* Display error */}
                    </FormControl>

                    <TextField
                        type="number"
                        placeholder="Hour"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        inputProps={{ min: 1, max: 12 }}
                        sx={{ width: '100px' }}
                        required
                        error={!!errors.hour}
                        helperText={errors.hour}
                        InputLabelProps={{
                            shrink: false,
                        }}
                    />
                    <TextField
                        type="number"
                        placeholder="Minute"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        inputProps={{ min: 0, max: 59 }}
                        sx={{ width: '100px' }}
                        required
                        error={!!errors.minute}
                        helperText={errors.minute}
                        InputLabelProps={{
                            shrink: false,
                        }}
                    />
                    <FormControl variant="outlined" sx={{ width: '120px' }} error={!!errors.amPm}>
                        <Select
                            displayEmpty
                            value={amPm}
                            onChange={(e) => setAmPm(e.target.value)}
                            renderValue={
                                amPm !== "" ? undefined : () => <span style={{ color: 'lightgray' }}>AM/PM</span>
                            }
                        >
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
                        </Select>
                        <Box sx={{ color: 'red', fontSize: '0.75rem' }}>{errors.amPm}</Box>  {/* Display error */}
                    </FormControl>
                </Box>
            </StyledCard>

            <Box sx={{ mb: 3 }} />

            <StyledCard>
                <ArgonTypography variant="h6">NOTIFICATION</ArgonTypography>
                <ArgonTypography>Recipients:</ArgonTypography>
                {recipients.map((recipient, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            placeholder="Recipient Email"
                            value={recipient}
                            onChange={(e) => handleRecipientChange(index, e.target.value)}
                            sx={{
                                width: '300px',
                                '& input': {
                                    color: recipient === "user@domain.com" ? 'lightgray' : 'black',
                                    
                                },
                            }}
                            required
                            error={!!errors.recipients}
                            helperText={index === recipients.length - 1 ? errors.recipients : ""}  // Display error only for the last one
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                        <Button variant="outlined" sx={{ color: '#333' }} color="error" onClick={() => handleRemoveRecipient(index)}>Remove</Button>
                    </Box>
                ))}
                <ArgonButton onClick={handleAddRecipient} variant="contained" color="primary" sx={{ marginTop: "10px", width: '200px' }}>
                    ADD RECIPIENT
                </ArgonButton>
            </StyledCard>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 3 }}>
                <ArgonButton onClick={handleSaveSchedule} variant="contained" color="success" sx={{ minWidth: '130px' }}>
                    SAVE SCHEDULE
                </ArgonButton>
                <ArgonButton onClick={handleCancel} variant="contained" color="error" sx={{ minWidth: '130px' }}>
                    CANCEL
                </ArgonButton>
            </Box>

            
        </>
    );
};

export default SchedulingReportForm;

