import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface MainBodyInterface  {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}