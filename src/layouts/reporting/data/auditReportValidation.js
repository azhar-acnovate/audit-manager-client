import moment from "moment";
import { eventOccurenceDateFormat } from "../../../utils/DateFormatter";
export const auditReportValidation = (data) => {
    const errors = {};

    if (!data.reportName) {
        errors.reportName = "Report Name is required.";
    }

    if (!data.refObjectIds || data.refObjectIds.length === 0) {
        errors.refObjectIds = "At least one Source Reference is required.";
    }

    if (!data.startDateRange) {
        errors.startDateRange = "Start Date is required.";
    } else if (!moment(data.startDateRange, eventOccurenceDateFormat, true).isValid()) {
        errors.startDateRange = "Start Date must be in valid format.";
    }

    if (!data.endDateRange) {
        errors.endDateRange = "End Date is required.";
    } else if (!moment(data.endDateRange, eventOccurenceDateFormat, true).isValid()) {
        errors.endDateRange = "End Date must be in valid format.";
    }

    // if (!data.changedUserNames) {
    //     errors.changedUserNames = "Changed Users are required.";
    // }

    return errors;
};
