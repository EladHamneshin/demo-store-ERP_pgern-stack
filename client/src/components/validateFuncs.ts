export const passwordValidet = {
    required: "⚠ Required field",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
      message:
        "⚠ Password must contain an uppercase letter, a lowercase letter, a digit, a special character, and be 8-20 characters long.",
    },
  };
  export const emailValidet = {
    required: "⚠ Required field",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "⚠ Invalid email address",
    },
  };
  export const nameValidet = {
    required: "⚠ Required field",
    minLength: {
      value: 2,
      message: "⚠ Must be at least two characters",
    },
  };

// function isValidEmail(email: string) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function isValidPassword(password: string) {
//     return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.{7,20}$)/.test(password);
// }

// function isValidName(name: string){
//     return name !== '';
// }

// export { isValidEmail, isValidPassword, isValidName };


