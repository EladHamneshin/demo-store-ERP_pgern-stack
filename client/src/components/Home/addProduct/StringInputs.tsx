import { Grid, TextField } from "@mui/material";
import { FC } from "react";
import { FieldInputInterface } from "../../../types/addProductInterfaces/FieldInputInterface";

export const NameInput: FC<FieldInputInterface> = ({
  register,
  requiredValidate,
  errors,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Product name"
        autoFocus
        {...register("name", requiredValidate)}
        helperText={errors.name?.message?.toString()}
        error={errors.name ? true : false}
      />
    </Grid>
  );
};

export const DescriptionInput: FC<FieldInputInterface> = ({
  register,
  requiredValidate,
  errors,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        autoFocus
        {...register("description", requiredValidate)}
        helperText={errors.description?.message?.toString()}
        error={errors.description ? true : false}
      />
    </Grid>
  );
};

export const SupplierInput: FC<FieldInputInterface> = ({
  register,
  requiredValidate,
  errors,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="supplier"
        label="Supplier"
        autoFocus
        {...register("supplier", requiredValidate)}
        helperText={errors.supplier?.message?.toString()}
        error={errors.supplier ? true : false}
      />
    </Grid>
  );
};


