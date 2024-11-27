export const validateSchedulingForm = (formValues) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { reportIds, frequency, schedulingHour, schedulingMinute, timeMarker, recipients } = formValues;

    // Validate reportIds
    if (!reportIds || (Array.isArray(reportIds) && reportIds.length === 0)) {
        errors.reportIds = "Report name is required";
    }

    // Validate frequency
    if (!frequency) {
        errors.frequency = "Frequency is required";
    }

    // Validate scheduling hour
    if (!schedulingHour || schedulingHour < 1 || schedulingHour > 12) {
        errors.schedulingHour = "Hour is required and must be between 1 and 12";
    }

    // Validate scheduling minute
    if (!schedulingMinute || schedulingMinute < 0 || schedulingMinute > 59) {
        errors.schedulingMinute = "Minute is required and must be between 0 and 59";
    }

    // Validate time marker
    if (!timeMarker) {
        errors.timeMarker = "AM/PM is required";
    }

    // Validate recipients
    const hasRecipients = recipients.length > 0 && !recipients.every(recipient => recipient.trim() === "");
    if (!hasRecipients) {
        errors.recipients = "At least one valid recipient is required";
    } else {
        recipients.forEach((recipient, index) => {
            const trimmedRecipient = recipient.trim();
            // Check email validity if the recipient field is not empty
            if (trimmedRecipient !== "" && !emailRegex.test(trimmedRecipient)) {
                errors.recipients = `Recipient ${index + 1} must be a valid email address`;
            }
        });
    }

    return errors;
};
