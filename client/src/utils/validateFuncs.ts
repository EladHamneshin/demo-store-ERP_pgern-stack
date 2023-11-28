function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.{7,20}$)/.test(password);
}

function isEmpty(field: string) {
  if (field.trim().length === 0) return true;
  else if (field.trim().length !== 0) return false;
}

export { isValidEmail, isValidPassword, isEmpty };
