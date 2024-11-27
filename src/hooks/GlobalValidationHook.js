import { useState } from 'react';
import Validation, { ValidationRuleNames } from './validation';

// Custom validation hook
const useValidation = (state, setState) => {
  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const onSavedHandler = (value) => { setIsSaved(value) };

  const validateForm = async (wizardStep) => {
    const newErrors = {};
    let isValid = true;
    let isCompare = false;
    let tempCompareValue;
    let tempCompareField;
    let tempCompareKey;
    let tempCompareError;

    for (const fieldName in state.validationRules) {
      const rules = state.validationRules[fieldName];
      const fieldValue = state[fieldName];

      for (const rule of rules) {
        const key = rule.name; // 'isRequired'
        const value = rule.value; // true
        const fieldWizardStep = rule.wizardStep;

        if (wizardStep != null && fieldWizardStep !== wizardStep) {
          continue;
        }

        if (key === "compare") {
          isCompare = true;
          tempCompareKey = fieldName;
          tempCompareValue = fieldValue;
          const valuePair = Object.entries(value);
          tempCompareField = valuePair[0][0];
          tempCompareError = valuePair[0][1];
        } else {

          const error = await Validation(fieldValue, key, value);
          if (error) {
            newErrors[fieldName] = error;
            isValid = false;
            break;
          }
        }
      }

      if (isCompare && tempCompareValue !== state[tempCompareField]) {
        newErrors[tempCompareKey] = tempCompareError;
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (fieldName, value, index) => {
    const fieldNames = fieldName.split(".");
    
    onSavedHandler(true);

    if (fieldNames.length > 1) {
      setState((prevState) => {
        const newState = { ...prevState };
        let target = newState;

        for (let i = 0; i < fieldNames.length - 1; i++) {
          target = target[fieldNames[i]];
        }

        if (index != null) {
          target[fieldNames[fieldNames.length - 1]][index] = value;
        } else {
          target[fieldNames[fieldNames.length - 1]] = value;
        }

        return newState;
      });
    } else {
      setState((prevState) => {
        const newState = { ...prevState };

        if (index != null) {
          newState[fieldName][index] = value;
        } else {
        
          // if (Array.isArray(value)) {
          //   newState[fieldName] = value.map(item => item.value);
          // } else {
          //   newState[fieldName] = value;
          // }
          newState[fieldName] = value;
        }

        return newState;
      });
    }
  };

  const getError = (fieldName) => {
    return errors[fieldName]
  }
  const isRequired = (fieldName) => {
    return state.validationRules != null && state.validationRules[fieldName] != null && state.validationRules[fieldName].find(
      rule => rule.name === ValidationRuleNames.isRequired && rule.value === true
    );
  }
  return {
    state,
    errors,
    handleChange,
    validateForm,
    isSaved,
    onSavedHandler,
    getError,
    isRequired
  };
};

export default useValidation;
