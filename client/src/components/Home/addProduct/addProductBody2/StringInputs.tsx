import { Grid, TextField } from "@mui/material";
import { FC } from "react";
import { StringInputInterface } from "./StringInputInterface";

export const NameInput: FC<StringInputInterface> = ({
  register,
  nameValidate,
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
        {...register("name", nameValidate)}
        helperText={errors.name?.message?.toString()}
        error={errors.name ? true : false}
      />
    </Grid>
  );
};

export const DescriptionInput: FC<StringInputInterface> = ({
  register,
  nameValidate,
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
        {...register("description", nameValidate)}
        helperText={errors.description?.message?.toString()}
        error={errors.description ? true : false}
      />
    </Grid>
  );
};

export const SupplierInput: FC<StringInputInterface> = ({
  register,
  nameValidate,
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
        {...register("supplier", nameValidate)}
        helperText={errors.supplier?.message?.toString()}
        error={errors.supplier ? true : false}
      />
    </Grid>
  );
};


