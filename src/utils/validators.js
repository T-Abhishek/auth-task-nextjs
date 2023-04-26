export const isValidEmail = (email) => {
    return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
}


// Min. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
export const isValidPassword = (password) => {
    // Reference: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

export const isValidName = (name) => {
    return /^[a-zA-Z]{2,}$/.test(name);
}

export const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
}

