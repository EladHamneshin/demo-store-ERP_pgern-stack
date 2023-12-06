import { Grid, TextField } from "@mui/material";
import { FC } from "react";
import { FieldInputInterface } from "../../../types/addProductInterfaces/FieldInputInterface";

export const ImgCoorTagInputs: FC<FieldInputInterface> = ({
  register,
  requiredValidate,
  errors,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        margin="normal"
        required
        id="imgUrl"
        label="Image Url"
        autoFocus
        {...register("imgUrl", requiredValidate)}
        helperText={errors.imgUrl?.message?.toString()}
        error={errors.imgUrl ? true : false}
        sx={{ marginRight: '30px' }}
      />

      <TextField
        margin="normal"
        required
        id="imgAlt"
        label="Image Alt"
        autoFocus
        {...register("imgAlt", requiredValidate)}
        helperText={errors.imgAlt?.message?.toString()}
        error={errors.imgAlt ? true : false}
        sx={{ marginRight: '30px' }}
      />

      <TextField
        margin="normal"
        required
        type="number"
        id="longitude"
        label="longitude"
        autoFocus
        {...register("longitude", requiredValidate)}
        helperText={errors.longitude?.message?.toString()}
        error={errors.longitude ? true : false}
        sx={{ marginRight: '30px' }}
      />

      <TextField
        margin="normal"
        required
        type="number"
        id="latitude"
        label="latitude"
        autoFocus
        {...register("latitude", requiredValidate)}
        helperText={errors.latitude?.message?.toString()}
        error={errors.latitude ? true : false}
        sx={{ marginRight: '30px' }}
      />

      <TextField
        margin="normal"
        required
        id="tagName"
        label="Tag name"
        autoFocus
        {...register("tagName", requiredValidate)}
        helperText={errors.tagName?.message?.toString()}
        error={errors.tagName ? true : false}
        sx={{ marginRight: '30px' }}
      />

      <TextField
        margin="normal"
        required
        id="tagVal"
        label="Tag value"
        autoFocus
        {...register("tagVal", requiredValidate)}
        helperText={errors.tagVal?.message?.toString()}
        error={errors.tagVal ? true : false}
        sx={{ marginRight: '30px' }}
      />
    </Grid>
  );
};