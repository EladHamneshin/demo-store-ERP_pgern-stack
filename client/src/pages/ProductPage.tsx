import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  CircularProgress,
  Modal
} from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate, useParams } from "react-router-dom";
import productsAPI from "../api/productsAPI";
import { useAppSelector } from '../utils/store/hooks';
import {Product} from "../types/Product";
import ROUTES from "../routes/routes";
// import EditProduct from '../components/EditProduct';

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { email } = useAppSelector((state) => state.email);
  const navigate = useNavigate();
  const { pid } = useParams();
  console.log(pid);
  
  const [product, setProduct] = useState<null | Product>(null);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const renderTitle = (title: string) => (
    <Typography variant="h6" style={{ background: '#f0f0f0', padding: '8px 0', marginBottom: '8px' }}>
      {title}
    </Typography>
  );
  const renderDetailRow = (label: string, value: string | number) => (
    <Grid container item xs={12}>
      <Grid item xs={4}>
        <Typography variant="subtitle1">{label}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );

  //handle get product by id from server
  const getProduct = async (pid: string) => {
    try {
      console.log(pid);

      const product = await productsAPI.getProduct(pid);
      setProduct(product);
    } catch (error) {
      console.error('Failed to fetch', error);
    };
  };

  //get the product after the page is rendered
  useEffect(() => {
    if (email === '') {
      navigate(ROUTES.LOGIN);
    }
    getProduct(pid!);
  }, []);

  //show modal component to edit product
  const onEdit = () => {
    /// modal component
    handleOpen();
  };

  //Navigate the user to home page after click dalete product
  const onDelete = async () => {
    /// delete the product
    await productsAPI.deleteProduct(pid!)
    navigate(`/HomePage`);
  };

  //When the product is loaded then show the component
  return (
    <>
      {
        !product ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : product && (
          <>
            <Card>
              <CardContent>
                {/* Title */}
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                  <Grid item>
                    {/* Title */}
                    <Typography variant="h5">Product Details</Typography>
                  </Grid>
                  <Grid item container justifyContent="flex-end" spacing={2}>
                    {/* Buttons */}
                    <Grid item>
                      <Button variant="contained" color="primary" endIcon={<Edit />} onClick={onEdit}>
                        Edit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="error" endIcon={<Delete />} onClick={onDelete}>
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* Left Side - Details */}
                  <Grid item xs={8}>
                    {/* Primary Details */}
                    {renderTitle('Primary Details')}
                    {renderDetailRow('Id', product.id)}
                    {renderDetailRow('Name', product.name)}
                    {renderDetailRow('Category', product.category)}
                    {renderDetailRow('Sale Price', `${product.saleprice}`)}

                    {/* Supplier Details */}
                    {renderTitle('Supplier Details')}
                    {renderDetailRow('Supplier', product.supplier)}
                    {renderDetailRow('Cost Price', `${product.costPrice}`)}
                    {renderDetailRow('For Sale', product.isForSale ? 'Yes' : 'No')}

                    {/* Stock Location Details */}
                    {renderTitle('Stock Location Details')}
                    {renderDetailRow('Longitude', product.coordinate!.longitude)}
                    {renderDetailRow('Latitude', product.coordinate!.latitude)}
                  </Grid>

                  {/* Right Side - Picture */}
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      image={product.image.url}
                      alt={product.image.alt}
                      style={{ objectFit: 'cover' }}
                    />
                    {/* Inventory Details */}
                    {renderTitle('Inventory Details')}
                    {renderDetailRow('Quantity', `${product.quantity}`)}
                    {renderDetailRow('Rating', `${product.rating}`)}
                  </Grid>
                </Grid>
              </CardContent>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
                {/* <EditProduct product={product}/> */}
              </Modal>
            </Card>
          </>
        )
      }
    </>
  );
};
export default ProductPage;