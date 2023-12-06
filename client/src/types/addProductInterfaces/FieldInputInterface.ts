import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface FieldInputInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  requiredValidate: {
    required: string;
  };
}