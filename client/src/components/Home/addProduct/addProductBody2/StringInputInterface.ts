import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface StringInputInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  nameValidate: {
    required: string;
    minLength: {
      value: number;
      message: string;
    }
    pattern: {
      value: RegExp;
      message: string;
    };
  };
}