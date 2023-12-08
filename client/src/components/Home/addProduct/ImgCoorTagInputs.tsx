import { Button, Grid, TextField } from "@mui/material";
import { FC } from "react";
import { FieldInputInterface } from "../../../types/addProductInterfaces/FieldInputInterface";
import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { saveTags } from "../../../store/tagSlice";

export const ImgCoorTagInputs: FC<FieldInputInterface> = ({
  register,
  requiredValidate,
  errors,
}) => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = React.useState<{ [key: string]: string }>({ '': '' });
  
  const updateTag = (oldKey: string, newKey: string, value: string) => {
    const updatedTags = { ...tags };
    delete updatedTags[oldKey]; // Remove the old key
    updatedTags[newKey] = value; // Add the new key
    setTags(updatedTags);
    dispatch(saveTags(updatedTags));
  };

  const deleteTag = (key: string) => {
    const updatedTags = { ...tags };
    delete updatedTags[key]; // Remove the key
    setTags(updatedTags);
  }

  const addNewTag = () => {
    setTags((prevTags) => ({
      ...prevTags,
      '': '',
    }));
  };

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

      {Object.keys(tags).map((key, index) => (
        <div key={index} style={{ display: "flex" }}>
          <TextField
            margin="normal"
            label="Tag Name"
            id="tagName"
            onChange={(e) => updateTag(key, e.target.value, tags[key])}
            helperText={errors.tagName?.message?.toString()}
            error={errors.tagName ? true : false}
            sx={{ marginRight: '30px' }}
          />
          <TextField
            margin="normal"
            label="Tag Value"
            id="tagVal"
            onChange={(e) => updateTag(key, key, e.target.value)}
            helperText={errors.tagVal?.message?.toString()}
            error={errors.tagVal ? true : false}
          />
          <Button onClick={() => deleteTag(key)}>Delete</Button>
        </div>
      ))}
      <Button onClick={addNewTag}>Add Tag</Button>
    </Grid>
  );
};