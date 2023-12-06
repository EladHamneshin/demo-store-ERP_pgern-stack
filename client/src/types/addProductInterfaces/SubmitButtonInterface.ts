import { FieldValues, UseFormWatch } from "react-hook-form";

export interface SubmitButtonInterface {
  isValid: boolean;
  watch: UseFormWatch<FieldValues>;
  handle: () => void;
}
