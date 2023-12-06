function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.{7,20}$)/.test(password);
}

const nameValidate = {
  required: "⚠ Required field",
  minLength: {
    value: 2,
    message: "⚠ Must be at least two characters",
  },
};

const requiredValidate = {
  required: "⚠ Required field",
};

export { isValidEmail, isValidPassword, nameValidate, requiredValidate };
