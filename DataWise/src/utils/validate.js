export const checkValidate = (email, password, name = null) => {
    if (name !== null) {
        const isNameValid = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(name);
        if (!isNameValid) return "Name is not valid";
    }

    const isEmailValid = /^([A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})$/.test(email);
    if (!isEmailValid) return "Email ID is not valid";

    const isPasswordValid = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#@$%&? "]).*$/.test(password);
    if (!isPasswordValid) return "Password is not valid";

    return null;
};
