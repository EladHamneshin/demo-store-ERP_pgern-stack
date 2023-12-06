import { Category, Product } from '../types/Product';
import { Edit } from '@mui/icons-material';
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Box,
  Stack,
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';
import productsAPI from '../api/productsAPI';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

type Props = {
  product: Product
}

function UpdateProduct(props: Props) {
  const [product, setProduct] = React.useState(props.product)
  const [initialProduct, setInitialProduct] = React.useState(props.product);
  const [name, setName] = React.useState(product.name);
  const [saleprice, setSalePrice] = React.useState(product.saleprice);
  const [quantity, setQuantity] = React.useState(product.quantity);
  const [description, setDescription] = React.useState(product.description);
  const [category, setCategory] = React.useState(product.category);
  const [discount, setDiscount] = React.useState(product.discount);
  const [rating, setRating] = React.useState(product.rating);
  const [clicked, setClick] = React.useState(product.clicked);
  const [url, setUrl] = React.useState(product.image.url);
  const [alt, setAlt] = React.useState(product.image.alt);
  const [isForSale, setIsForSale] = React.useState(product.isForSale);
  const [longitude, setLongitude] = React.useState(product.coordinate.longitude);
  const [latitude, setLatitude] = React.useState(product.coordinate.latitude);
  const [costPrice, setCostPrice] = React.useState(product.costPrice);
  const [supplier, setSupplier] = React.useState(product.supplier);
  const [tags, setTags] = React.useState({ ...product.tags });
  const [categories, setCategories] = React.useState<Category[]>([{name: 'foo', id: '1', clicked: 0}, {name: 'bar', id: '2', clicked: 0}])

  const [open, setOpen] = React.useState(false); //for editing the product
  const handleOpen = async() => {
    const categories = await productsAPI.getCategories();
    console.log(categories);
    
    setOpen(true);
    setCategories(categories)};
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!open) {
      // Reset the state to the initial values when the dialog is closed
      setProduct(initialProduct);
      setName(initialProduct.name);
      setSalePrice(initialProduct.saleprice);
      setQuantity(initialProduct.quantity);
      setDescription(initialProduct.description);
      setCategory(initialProduct.category);
      setDiscount(initialProduct.discount);
      setRating(initialProduct.rating);
      setClick(initialProduct.clicked);
      setUrl(initialProduct.image.url);
      setAlt(initialProduct.image.alt);
      setIsForSale(initialProduct.isForSale);
      setLongitude(initialProduct.coordinate.longitude);
      setLatitude(initialProduct.coordinate.latitude);
      setCostPrice(initialProduct.costPrice);
      setSupplier(initialProduct.supplier);
      setTags({ ...initialProduct.tags });
    }
  }, [open, initialProduct]);

  const submitUpdates = async () => {
    const updatedProduct: Product = {
      id: product.id,
      category,
      clicked,
      description,
      coordinate: {
        latitude,
        longitude
      },
      costPrice,
      image: {
        alt,
        url
      },
      supplier,
      isForSale,
      name,
      quantity,
      rating,
      saleprice,
      tags: { ...tags },
      discount
    };
    
    setProduct(updatedProduct)
    try {
      const req = await productsAPI.updateProduct(updatedProduct);
      console.log('ererer', req);
      
      console.log('Updated Product');
    } catch (err) {
      console.log('failed to update Product');
    }
    navigate(`${ROUTES.PRODUCT_ROUTE}/${product.id}`)
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
      <Button variant="contained" color="primary" endIcon={<Edit />} onClick={handleOpen}>
        Edit
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
              <DialogTitle>Edit Product</DialogTitle>
              <DialogContent>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Sale Price"
                  value={saleprice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                />
                <Autocomplete
                  id="Category"
                  freeSolo
                  fullWidth
                  value={category}
                  options={categories!.map((option) => option.name)}
                  renderInput={(params) => <TextField margin='normal' {...params} label="Category" />}
                  onChange={(event, newValue) => {
                    newValue ? setCategory(newValue): setCategory(category)
                  }}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Click"
                  value={clicked}
                  onChange={(e) => setClick(Number(e.target.value))}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Image URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Image Alt"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                />
                <TextField
                  type="number"
                  margin="normal"
                  fullWidth
                  label="Cost Price"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
                <h3>Tags</h3>
                {Object.keys(tags).map((key, index) => (
                  <div key={index} style={{ display: "flex" }}>
                    <TextField
                      margin="normal"
                      label="Tag Name"
                      value={key}
                      onChange={(e) => updateTag(key, e.target.value, tags[key])}
                    />
                    <TextField
                      margin="normal"
                      label="Tag Value"
                      value={tags[key]}
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
                <Button onClick={submitUpdates}>Update Product</Button>
              </DialogActions>
            </Box>
          </Container>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default UpdateProduct