import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import MainBody from './MainBody';
import { FieldValues, useForm } from 'react-hook-form';
import SubmitButton from './SubmitButton';

export default function AddProduct2() {
  const [open, setOpen] = useState(false);
  const [isForSale, setForSale] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const handleSale = () => {
    setForSale(!isForSale)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const onSubmit = (event: FieldValues) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);    
  };


  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <DialogTitle>Add new product</DialogTitle>
          <DialogContent>
            <MainBody />
            <FormControlLabel
              required
              onClick={handleSale}
              control={<Checkbox defaultChecked />}
              label="Is For Sale"
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