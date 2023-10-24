function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^[a-zA-Z0-9]{8,}$/

    if (values.name === '') {
        error.name = "Name should not to be empty"
    } else {
        error.name = '';
    }

    if (values.email === '') {
        error.email = "Email should not to be empty"
    } else if (!email_pattern.test(values.email)) {
        error.email = "It doesn't look like email"
    } else {
        error.email = '';
    }

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