import { ValidationRuleNames } from "../../../hooks/validation";

export const initialTempAttributeData = {
    id: null,
    fullName: null,
    email: null,
    userName: null,
    password: null,
    confirmPassword: null,
    role: null,
    validationRules: {
        fullName: [
            { name: ValidationRuleNames.isRequired, value: true },
            { name: ValidationRuleNames.maxLength, value: 50 },
        ],
        email: [
            { name: ValidationRuleNames.isRequired, value: true },
            { name: ValidationRuleNames.isEmail, value: true },
        ],
        userName: [
            { name: ValidationRuleNames.isRequired, value: true },
            { name: ValidationRuleNames.maxLength, value: 30 },
            { name: ValidationRuleNames.isUsernamePattern, value: true },
        ],
        // password: [
        //     { name: ValidationRuleNames.isRequired, value: true },
        //     { name: ValidationRuleNames.minLength, value: 6 },
            
        // ],
        // confirmPassword: [
        //     { name: ValidationRuleNames.isRequired, value: true },
        //     { name: ValidationRuleNames.compare, value: { password: "Password and Confirm Password must be same" } },  // Compare with refObjectId
        
        // ],
        role: [
            { name: ValidationRuleNames.isRequired, value: true },
        ],
    }
};