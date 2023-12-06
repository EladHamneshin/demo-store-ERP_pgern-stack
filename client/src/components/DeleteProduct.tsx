import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import productsAPI from '../api/productsAPI';
import ROUTES from '../routes/routes';

type Props = {
  id: string;
};

function DeleteProduct(props: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = async () => {
    try {
      // Delete the product
      await productsAPI.deleteProduct(props.id);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      navigate(ROUTES.HOME);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="contained" color="error" endIcon={<Delete />} onClick={handleOpen}>
        Delete
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onDelete} color="error">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteProduct;
