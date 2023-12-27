export const validateLogin = ({ email, password }) => {
  return validateEmail(email) && validatePassword(password);
};

export const validateRegistration = ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  return (
    validateEmail(email) &&
    validateUsername(username) &&
    validatePassword(password) &&
    validateConfirmPassword(password, confirmPassword)
  );
};

export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const validateUsername = (username) => {
  return username.length > 2;
};

const validatePassword = (password) => {
  return password.length > 7;
};

const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
