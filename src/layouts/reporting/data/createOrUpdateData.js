import moment from "moment";
import { DateFormatter, reportDateFormat } from "../../../utils/DateFormatter";

export const initialAuditReportData = {
    id: null,
    refObjectIds:[],
    reportName: null,
    startDateRange: DateFormatter.dateToString(moment(),reportDateFormat),
    endDateRange: DateFormatter.dateToString(moment(),reportDateFormat),
    changedUserNames: '',
    validationRules: {       
    }

};