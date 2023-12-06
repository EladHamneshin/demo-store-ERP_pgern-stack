import { Grid, TextField } from "@mui/material";
import { FC } from "react";
import { FieldInputInterface } from "../../../types/addProductInterfaces/FieldInputInterface";

export const NumberInputs: FC<FieldInputInterface> = ({
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
        type="number"
        id="costPrice"
        label="Cost Price"
        autoFocus
        {...register("costPrice", requiredValidate)}
        helperText={errors.costPrice?.message?.toString()}
        error={errors.costPrice ? true : false}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        type="number"
        id="salePrice"
        label="Sale Price"
        autoFocus
        {...register("salePrice", requiredValidate)}
        helperText={errors.salePrice?.message?.toString()}
        error={errors.salePrice ? true : false}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        type="number"
        id="quantity"
        label="quantity"
        autoFocus
        {...register("quantity", requiredValidate)}
        helperText={errors.quantity?.message?.toString()}
        error={errors.quantity ? true : false}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        type="number"
        id="discount"
        label="Discount Percentage"
        autoFocus
        {...register("discount", requiredValidate)}
        helperText={errors.discount?.message?.toString()}
        error={errors.discount ? true : false}
      />
    </Grid>
  );
};