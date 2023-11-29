function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.{7,20}$)/.test(password);
}

function isEmpty(event: React.ChangeEvent<HTMLInputElement>) {
  if (event.target.value.trim().length === 0) return true;
  else if (event.target.value.trim().length !== 0) return false;
}

export { isValidEmail, isValidPassword, isEmpty };
