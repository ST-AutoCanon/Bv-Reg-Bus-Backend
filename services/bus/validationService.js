export const isEmpty = (value) => {
  return value === undefined || value === null || value === "";
};

export const validateValue = (field, value) => {
  const errors = [];

  const { label, type, isRequired, options = [], validation = {} } = field;

  // Required
  if (isRequired && isEmpty(value)) {
    errors.push(`${label} is required`);

    return errors;
  }

  // Optional and empty
  if (isEmpty(value)) {
    return errors;
  }

  // Number
  if (type === "number") {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      errors.push(`${label} must be a number`);

      return errors;
    }

    if (validation.min !== undefined && numberValue < validation.min) {
      errors.push(`${label} must be at least ${validation.min}`);
    }

    if (validation.max !== undefined && numberValue > validation.max) {
      errors.push(`${label} must not exceed ${validation.max}`);
    }
  }

  // Date
  if (type === "date") {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      errors.push(`${label} must be a valid date`);
    }
  }

  // Dropdown / Radio
  if (type === "dropdown" || type === "radio") {
    const validValues = options.map((option) => option.value);

    if (!validValues.includes(value)) {
      errors.push(`${label} has an invalid value`);
    }
  }

  // Checkbox
  if (type === "checkbox") {
    if (typeof value !== "boolean") {
      errors.push(`${label} must be true or false`);
    }
  }

  // Min length
  if (
    typeof value === "string" &&
    validation.minLength !== undefined &&
    value.length < validation.minLength
  ) {
    errors.push(`${label} must be at least ${validation.minLength} characters`);
  }

  // Max length
  if (
    typeof value === "string" &&
    validation.maxLength !== undefined &&
    value.length > validation.maxLength
  ) {
    errors.push(`${label} must not exceed ${validation.maxLength} characters`);
  }

  // Pattern
  if (typeof value === "string" && validation.pattern) {
    try {
      const regex = new RegExp(validation.pattern);

      if (!regex.test(value)) {
        errors.push(`${label} has an invalid format`);
      }
    } catch {
      errors.push(`${label} has an invalid validation pattern`);
    }
  }

  return errors;
};