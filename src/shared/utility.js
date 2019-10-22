export const validateInput = (value, validationRules) => {
    let isValid = true;

    if (validationRules.required) {
        isValid = value.trim() !== "" && isValid;
    }

    if (validationRules.minLength) {
        isValid = value.length >= validationRules.minLength && isValid;
    }

    if (validationRules.maxLength) {
        isValid = value.length <= validationRules.maxLength && isValid;
    }

    if (validationRules.emailFormat) {
        isValid = value.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/) && isValid;
    }

    if (validationRules.onlyNumbers) {
        isValid = value.match(/^[0-9]+$/) && isValid;
    }

    return isValid;
};

export const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month <= 9 ? "0" + month : month}/${day <= 9 ? "0" + day : day}/${year}`;
};