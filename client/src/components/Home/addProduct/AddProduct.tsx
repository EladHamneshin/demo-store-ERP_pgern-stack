import { Category, Product } from '../../../types/Product';
import { Add } from '@mui/icons-material';
import {
  Button,
  TextField,
  Container,
  Box,
  Autocomplete,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/routes';
import productsAPI from '../../../api/productsAPI';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


function AddProduct() {
  const [name, setName] = React.useState<string | undefined>('');
  const [saleprice, setSalePrice] = React.useState<number | undefined>(0);
  const [quantity, setQuantity] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [clicked, setClick] = React.useState(0);
  const [url, setUrl] = React.useState('');
  const [alt, setAlt] = React.useState('');
  const [isForSale, setIsForSale] = React.useState(false);
  const [longitude, setLongitude] = React.useState(0);
  const [latitude, setLatitude] = React.useState(0);
  const [costprice, setCostPrice] = React.useState(0);
  const [supplier, setSupplier] = React.useState('');
  const [tags, setTags] = React.useState<{ [key: string]: string }>({'': ''});
  const [categories, setCategories] = React.useState<Category[]>([{name: 'foo', id: '1', clicked: 0}, {name: 'bar', id: '2', clicked: 0}])

  const [open, setOpen] = React.useState(false); //for editing the product
  const navigate = useNavigate();
  const handleOpen = async() => {
    const categories = await productsAPI.getCategories();
    console.log(categories);
    
    setOpen(true);
    setCategories(categories)};
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) {
      // Reset the state to the initial values when the dialog is closed
      setName('');
      setSalePrice(0);
      setQuantity(0);
      setDescription('');
      setCategory('');
      setDiscount(0);
      setRating(0);
      setClick(0);
      setUrl('');
      setAlt('');
      setIsForSale(false);
      setLongitude(0);
      setLatitude(0);
      setCostPrice(0);
      setSupplier('undefined');
      setTags({'': ''});
    }
  }, [open]);

  const submitAdded = async () => {
    const newProduct: Product = {
      category: category!,
      clicked: clicked!,
      description: description!,
      coordinate: {
        latitude: latitude!,
        longitude: longitude!
      },
      costprice: costprice!,
      image: {
        alt: alt!,
        url: url!
      },
      supplier: supplier!,
      isforsale: isForSale!,
      name: name!,
      quantity: quantity!,
      rating: rating!,
      saleprice: saleprice!,
      tags: { ...tags },
      discount: discount!
    };
    try {
      const req = await productsAPI.addnewProduct(newProduct);
      console.log('ererer', req);
      console.log('Add Product');
      navigate(`${ROUTES.PRODUCT_ROUTE}/${req.id}`)
    } catch (err) {
      console.log('failed to Add Product');
    } finally {

    }
  };

  const updateTag = (oldKey: string, newKey: string, value: string) => {
    const updatedTags = { ...tags };
    delete updatedTags[oldKey]; // Remove the old key
    updatedTags[newKey] = value; // Add the new key
    setTags(updatedTags);
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


  const isForSaleHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsForSale(event.target.checked);
  };

  return (
    <>
      <Button variant="contained" color="primary" endIcon={<Add />} onClick={handleOpen}>
        Add New Product
      </Button>
      <ThemeProvider theme={defaultTheme}>
        <Dialog open={open} onClose={handleClose}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <DialogTitle>Add New Product</DialogTitle>
              <DialogContent>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Name"
                  onChange={(e) => { setName(e.target.value) }}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Sale Price"
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Quantity"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                />
                <Autocomplete
                  id="Category"
                  freeSolo
                  fullWidth
                  options={categories!.map((option) => option.name)}
                  renderInput={(params) => <TextField margin='normal' {...params} label="Category" />}
                  onChange={(_, newValue) => {
                    newValue ? setCategory(newValue): setCategory(category)
                  }}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Discount"
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Rating"
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Click"
                  onChange={(e) => setClick(Number(e.target.value))}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Image URL"
                  onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Image Alt"
                  onChange={(e) => setAlt(e.target.value)}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Longitude"
                  onChange={(e) => setLongitude(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Latitude"
                  onChange={(e) => setLatitude(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Cost Price"
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Supplier"
                  onChange={(e) => setSupplier(e.target.value)}
                />
                <h3>Tags</h3>
                {Object.keys(tags).map((key, index) => (
                  <div key={index} style={{ display: "flex" }}>
                    <TextField
                      margin="normal"
                      label="Tag Name"
                      onChange={(e) => updateTag(key, e.target.value, tags[key])}
                    />
                    <TextField
                      margin="normal"
                      label="Tag Value"
                      onChange={(e) => updateTag(key, key, e.target.value)}
                    />
                    <Button onClick={() => deleteTag(key)}>Delete</Button>
                  </div>
                ))}
                <Button onClick={addNewTag}>Add Tag</Button>
                <span>Is For Sale</span>
                <Switch
                  checked={isForSale}
                  onChange={isForSaleHandleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submitAdded}>Add Product</Button>
              </DialogActions>
            </Box>
          </Container>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default AddProduct