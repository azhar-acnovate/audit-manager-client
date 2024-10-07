import { ValidationRuleNames } from "../../../hooks/validation";
export const initialTempAdditionalInfo ={
    validationRules:{
        fieldName: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
        fieldValue: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
    }
}
export const additionalInfoColumns = [
    { headerName: 'Field Name', field: 'fieldName', align: 'left' },
    { headerName: 'Field Value', field: 'fieldValue', align: 'center' },
];
export const initialTempSourceReferenceData = {
    id:null,
    objectName:null,
    refernceKey:null,
    additionalInfo:[],
    validationRules: {
        objectName: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
        refernceKey: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
    }
}