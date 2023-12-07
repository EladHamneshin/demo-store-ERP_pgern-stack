import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useState } from 'react';
import {MainBody} from './MainBody';
import { FieldValues, useForm } from 'react-hook-form';
import SubmitButton from './SubmitButton';
import { Add } from '@mui/icons-material';

export default function AddProductComponent() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event: FieldValues) => {
    event.preventDefault();
  };

  return (
    <>
      <Button variant="contained" endIcon={<Add />} onClick={handleOpen}>
        Add product 
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <DialogTitle>Add new product</DialogTitle>
          <DialogContent>
            <MainBody
              register={register}
              errors={errors}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <SubmitButton
              isValid={isValid}
              watch={watch}
              handle={handleClose}
            />
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}