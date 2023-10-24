function Validation(values) {
    let error = {};
    const password_pattern = /^[a-zA-Z0-9]{8,}$/

    if (values.password === '') {
        error.password = "Password should not to be empty"
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password should have 8 numbers or letters"
    } else {
        error.password = '';
    }

    return error;
}

export default Validation;