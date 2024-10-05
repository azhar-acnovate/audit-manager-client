
export const validateSchedulingForm = (formValues) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { reportName, frequency, hour, minute, amPm, recipients } = formValues;

    if (!reportName) {
        errors.reportName = "Report name is required";
    }
    if (!frequency) {
        errors.frequency = "Frequency is required";
    }
    if (!hour || hour < 1 || hour > 12) {
        errors.hour = "Hour is required and must be between 1 and 12";
    }
    if (!minute || minute < 0 || minute > 59) {
        errors.minute = "Minute is required and must be between 0 and 59";
    }
    if (!amPm) {
        errors.amPm = "AM/PM is required";
    }

    // Check if recipients list is empty or if all recipients are empty strings
    if (recipients.length === 0 || recipients.every(recipient => recipient.trim() === "")) {
        errors.recipients = "At least one valid recipient is required";
    } else {
        recipients.forEach((recipient, index) => {
            // Only check email validity if the recipient field is not empty
            if (recipient.trim() !== "" && !emailRegex.test(recipient)) {
                errors.recipients = `Recipient ${index + 1} must be a valid email address`;
            }
        });
    }

    return errors;
};
