import React, { useState } from "react";
import { Box, Card, TextField, FormControl, Select, MenuItem, Button, FormHelperText } from "@mui/material";
import { styled } from "@mui/system";
import ArgonButton from "../../../components/ArgonButton";
import ArgonTypography from "../../../components/ArgonTypography";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/toast/Toast";
import { validateSchedulingForm } from "../data/SchedulingReportValidation";
import DashboardNavbar from "../../dashboard/DashboardNavbar";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import schedulingReportService from "../../../rest-services/schedulingReportService";
import ReportAutocomplete from "./ReportsAutocomplete";

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: theme.shadows[3],
    '&:hover': { boxShadow: theme.shadows[6] },
}));

const SchedulingReportForm = () => {
    const [reportIds, setReportIds] = useState("");
    const [recipients, setRecipients] = useState([""]);
    const [frequencyType, setFrequencyType] = useState("");
    const [frequency, setFrequency] = useState("");
    const [schedulingHour, setHour] = useState("");
    const [schedulingMinute, setMinute] = useState("");
    const [timeMarker, setTimeMarker] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { showSuccessToast, showErrorToast } = useToast();

    const handleAddRecipient = () => {
        const trimmedRecipients = recipients.map(recipient => recipient.trim());

        if (trimmedRecipients.some(recipient => recipient === "")) {
            showErrorToast("Fill the empty recipient before adding new.");
            return;
        }

        const validationErrors = validateSchedulingForm({ reportIds, frequencyType, schedulingHour, schedulingMinute, timeMarker, recipients });
        if (Object.keys(validationErrors).length > 0) {
            showErrorToast(validationErrors.recipients ? "Please enter a valid email before adding the next recipient." : "Fill the existing recipient.");
            return;
        }

        if (new Set(trimmedRecipients).size !== trimmedRecipients.length) {
            showErrorToast("Duplicate recipient found! Please enter unique email addresses.");
            return;
        }

        setRecipients([...recipients, ""]);
    };

    const handleRecipientChange = (index, value) => {
        const newRecipients = [...recipients];
        newRecipients[index] = value;
        setRecipients(newRecipients);
    };

    const handleRemoveRecipient = (index) => {
        if (recipients.length === 1) {
            showErrorToast("At least one recipient is required.");
            return;
        }
        setRecipients(recipients.filter((_, i) => i !== index));
    };

    const handleSaveSchedule = async () => {
        const formValues = { reportIds, recipients, frequencyType, frequency, schedulingHour, schedulingMinute, timeMarker };
        const validationErrors = validateSchedulingForm(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            showErrorToast("All required fields must be completed with valid input before submitting.");
            return;
        }

        try {
            await schedulingReportService.saveReport(formValues);
            showSuccessToast("Schedule saved successfully!");
            resetForm();
        } catch (error) {
            showErrorToast("Failed to save schedule. Please try again.");
        }
    };

    const resetForm = () => {
        setReportIds("");
        setRecipients([""]);
        setFrequencyType("");
        setHour("");
        setMinute("");
        setTimeMarker("");
        setErrors({});
    };

    const handleCancel = () => {
        navigate("/scheduling-audit-report");
    };
    const handleFrequencyValueChange = (value) => {
        setFrequency(value);
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />

            <StyledCard>
                <ArgonTypography variant="h6">Report Name:</ArgonTypography>
                <ReportAutocomplete
                    multiple={true}
                    defaultValue={reportIds}
                    helperText={errors.reportIds}
                    error={!!errors.reportIds}
                    onChange={(value) => setReportIds(value ? value.map(item => item.id) : [])}
                />
            </StyledCard>

            <StyledCard>
                <ArgonTypography variant="h6">SCHEDULING</ArgonTypography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControl sx={{ width: '120px' }} error={!!errors.frequencyType}>
                        <Select
                            displayEmpty
                            value={frequencyType}
                            onChange={(e) => setFrequencyType(e.target.value)}
                            renderValue={frequencyType !== "" ? undefined : () => <span style={{ color: 'lightgray' }}>Frequency</span>}
                        >
                            <MenuItem value="DAILY">DAILY</MenuItem>
                            <MenuItem value="WEEKLY">WEEKLY</MenuItem>
                            <MenuItem value="MONTHLY">MONTHLY</MenuItem>
                        </Select>
                        <Box sx={{ color: 'red', fontSize: '0.75rem' }}>{errors.frequencyType}</Box>
                    </FormControl>

                    {/* Frequency Value Selector */}
                    {frequencyType === "WEEKLY" && (
                        <FormControl sx={{ width: '120px' }} error={!!errors.frequency}>
                            <Select
                                displayEmpty
                                value={frequency}
                                onChange={(e) => handleFrequencyValueChange(e.target.value)}
                                renderValue={frequency !== "" ? undefined : () => <span style={{ color: 'lightgray' }}>Select Day</span>}
                            >
                                <MenuItem value="MON">Monday</MenuItem>
                                <MenuItem value="TUE">Tuesday</MenuItem>
                                <MenuItem value="WED">Wednesday</MenuItem>
                                <MenuItem value="THU">Thursday</MenuItem>
                                <MenuItem value="FRI">Friday</MenuItem>
                                <MenuItem value="SAT">Saturday</MenuItem>
                                <MenuItem value="SUN">Sunday</MenuItem>

                            </Select>
                            <Box sx={{ color: 'red', fontSize: '0.75rem' }}>{errors.frequency}</Box>
                        </FormControl>
                    )}

                    {frequencyType === "MONTHLY" && (
                        <FormControl sx={{ width: '150px' }} error={!!errors.frequency}>
                            <Select
                                displayEmpty
                                value={frequency}
                                onChange={(e) => handleFrequencyValueChange(e.target.value)}
                                renderValue={frequency !== "" ? undefined : () => <span style={{ color: 'lightgray' }}>Select Date</span>}
                            >
                                {Array.from({ length: 31 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box sx={{ color: 'red', fontSize: '0.75rem' }}>{errors.frequency}</Box>
                        </FormControl>
                    )}

                    <TextField
                        type="number"
                        placeholder="Hr"
                        value={schedulingHour}
                        onChange={(e) => setHour(e.target.value)}
                        inputProps={{ min: 1, max: 12 }}
                        sx={{ width: '100px' }}
                        error={!!errors.schedulingHour}
                        helperText={errors.schedulingHour}
                    />

                    <TextField
                        type="number"
                        placeholder="Min"
                        value={schedulingMinute}
                        onChange={(e) => setMinute(e.target.value)}
                        inputProps={{ min: 0, max: 59 }}
                        sx={{ width: '100px' }}
                        error={!!errors.schedulingMinute}
                        helperText={errors.schedulingMinute}
                    />

                    <FormControl sx={{ width: '120px' }} error={!!errors.timeMarker}>
                        <Select
                            displayEmpty
                            value={timeMarker}
                            onChange={(e) => setTimeMarker(e.target.value)}
                            renderValue={timeMarker !== "" ? undefined : () => <span style={{ color: 'lightgray' }}>AM/PM</span>}
                        >
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
                        </Select>
                        <Box sx={{ color: 'red', fontSize: '0.75rem' }}>{errors.timeMarker}</Box>
                    </FormControl>
                </Box>
                {frequencyType === "MONTHLY"&&<FormControl sx={{pt:2}} error={true} fullWidth>
                    <FormHelperText >Note : If the selected date is the 30th or 31st, and that day does not exist in the chosen month, the schedule will not occur.</FormHelperText>
                </FormControl>}

            </StyledCard>

            <StyledCard>
                <ArgonTypography variant="h6">NOTIFICATION</ArgonTypography>
                <ArgonTypography>Recipients:</ArgonTypography>
                {recipients.map((recipient, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            placeholder="user@domain.com"
                            value={recipient}
                            onChange={(e) => handleRecipientChange(index, e.target.value)}
                            sx={{ width: '300px' }}
                            error={!!errors.recipients}
                            helperText={index === recipients.length - 1 ? errors.recipients : ""}
                        />
                        <Button variant="outlined" color="error" onClick={() => handleRemoveRecipient(index)}>Remove</Button>
                    </Box>
                ))}
                <ArgonButton
                    onClick={handleAddRecipient}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "10px", width: '200px' }}
                    disabled={!!errors.recipients}
                >
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
        </DashboardLayout>
    );
};

export default SchedulingReportForm;
