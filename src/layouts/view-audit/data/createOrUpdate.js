import moment from "moment";
import { ValidationRuleNames } from "../../../hooks/validation";
import { DateFormatter, eventOccurenceDateFormat } from "../../../utils/DateFormatter";

export const initialTempAttibuteData = {
    id: null,
    attributeName: null,
    oldValue: null,
    newValue: null,
    changedBy: null,
    auditObjectChangeTrackerId:null,
    validationRules: {
        attributeName: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
        oldValue: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
        newValue: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
        changedBy: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
    }

};

export const initialTempObjectData = {
    id: null,
    refObjectId: null,
    eventType: null,
    eventOccurence: DateFormatter.dateToString(moment(),eventOccurenceDateFormat),
    validationRules: {
        refObjectId: [
            { name: ValidationRuleNames.isRequired, value: true },
            { name: ValidationRuleNames.isInteger, value: true },
        ],
        eventType: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
        eventOccurence: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
    }

};
