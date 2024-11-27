
export const ValidationRuleNames = {
  isRequired: "isRequired",
  maxLength: "maxLength",
  minLength: "minLength",
  isEmail: "isEmail",
  isInteger: "isInteger",
  isFloat: "isFloat",
  customValidation: "customValidation",
  compare: "compare",
  customValidationAsync: "customValidationAsync",
  isStrongPassword: "isStrongPassword",  
  isUsernamePattern: "isUsernamePattern" 
};

const Validation = async (fieldValue, key, value, otherFieldValue) => {
  let result;

  switch (key) {
    case ValidationRuleNames.isRequired:
      if (value && !fieldValue) {
        return "Required";
      }
      break;

    case ValidationRuleNames.maxLength:
      if (fieldValue.length > value) {
        return "Maximum length should be " + value;
      }
      break;

    case ValidationRuleNames.minLength:
      if (fieldValue.length < value) {
        return "Minimum length should be " + value;
      }
      break;

    case ValidationRuleNames.isEmail:
      if (value && !(/\S+@\S+\.\S+/.test(fieldValue))) {
        return "Not a valid email";
      }
      break;

    case ValidationRuleNames.isInteger:
      if (value && !Number.isInteger(Number(fieldValue))) {
        return "Only Numeric value";
      }
      break;

    case ValidationRuleNames.isFloat:
      const regex = new RegExp(`^\\d+(\\.\\d{1,${value > 1 ? value - 1 : value}})?$`);
      if (regex.test(fieldValue)) {
        return `more than ${value} decimal points`;
      }
      break;

    case ValidationRuleNames.isStrongPassword:
        if (value) {
          const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!strongPasswordRegex.test(fieldValue)) {
            return "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character";
          }
        }
        break;
        
  
    case ValidationRuleNames.isUsernamePattern:
        if (value) {
          const usernamePattern = /^[a-zA-Z0-9_]{5,15}$/; // Example pattern
          if (!usernamePattern.test(fieldValue)) {
            return "Username must be between 5 and 15 characters and may include letters, numbers, and underscores only";
          }
        }
        break;

    case ValidationRuleNames.customValidation:
      return value(fieldValue);

    case ValidationRuleNames.customValidationAsync:
      return await value(fieldValue);

    default:
      return result;
  }
};

export default Validation;
