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
    sourceReferenceName:null,
    sourceReferenceKey:null,
    additionalInfo:[],
    validationRules: {
        sourceReferenceName: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
        sourceReferenceKey: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
    }
}