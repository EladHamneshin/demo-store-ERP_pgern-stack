import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddProductBody from './AddProductBody';
import { Product } from '../../../types/Product';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import productsAPI from '../../../api/productsAPI';
import { useNavigate } from 'react-router-dom';

export default function AddProduct(isUpdated: any, setIsUpdated: any ) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isForSale, setForSale] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeIsUpdated = () => {
    if (isUpdated) setIsUpdated(false);
    else setIsUpdated(true)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formProduct: Omit<Product, 'id'> = {
      name: data.get('name')!.toString(),
      saleprice: parseInt(data.get('salePrice')!.toString()),
      quantity: parseInt(data.get('quantity')!.toString()),
      description: data.get('description')!.toString(),
      category: data.get('category')!.toString(),
      discount: parseInt(data.get('discountPercentage')!.toString()),
      rating: 0,
      clicked: 0,
      image: {
        url: data.get('imageUrl')!.toString(),
        alt: data.get('imageAlt')!.toString()
      },
      coordinate: {
        longitude: parseInt(data.get('longitude')!.toString()),
        latitude: parseInt(data.get('latitude')!.toString())
      },
      tags: {
        "brand": data.get('tags')!.toString() 
      },
      costprice: parseInt(data.get('costPrice')!.toString()),
      isForSale: isForSale,
      supplier: data.get('supplier')!.toString()
    }
    console.log('is for sale:',formProduct.isForSale);
    

    try {
      const newProduct = await productsAPI.addnewProduct(formProduct);
      console.log('newProduct:', newProduct);
      console.log('success!');
      navigate(`/product/${newProduct.id}`);

    } catch (error) {
      console.error(error);
      // toastError((error as Error).message);
    }

  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogTitle>Add new product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill all this fields and press submit to add new product. 
            </DialogContentText>
            <AddProductBody />
            <FormControlLabel required control={<Checkbox checked />} label="Is For Sale" />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={() => {
              handleClose();
              changeIsUpdated()
              }} 
              >Add</Button>
          </DialogActions>
        </Box>
      </Dialog>

    </>

  );
}

