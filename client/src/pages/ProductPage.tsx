import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  CircularProgress
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import productsAPI from "../api/productsAPI";
import {Product} from "../types/Product";
import ROUTES from "../routes/routes";
import EditProduct from '../components/EditProduct';
import DeleteProduct from "../components/DeleteProduct";

const ProductPage = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  
  const [open, setOpen] = useState(false);
  const openObj = {
    open,
    setOpen
  }


  const [product, setProduct] = useState<null | Product>(null);
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
      const product = await productsAPI.getProduct(pid);
      setProduct(product);
    } catch (error) {
      console.error('Failed to fetch', error);
    };
  };

  //get the product after the page is rendered
  useEffect(() => {
    if (!localStorage.getItem('erp_token')) {
      navigate(ROUTES.LOGIN);
    }
    getProduct(pid!);
  }, [open]);

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
                      {/* edit button */}
                      <EditProduct product={product} openObj={openObj}/>
                    </Grid>
                    <Grid item>
                      {/* delete button */}
                      <DeleteProduct id={pid!}/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* Left Side - Details */}
                  <Grid item xs={8}>
                    {/* Primary Details */}
                    {renderTitle('Primary Details')}
                    {renderDetailRow('Id', product.id!)}
                    {renderDetailRow('Name', product.name)}
                    {renderDetailRow('Category', product.category)}
                    {renderDetailRow('Sale Price', `${product.saleprice}`)}

                    {/* Supplier Details */}
                    {renderTitle('Supplier Details')}
                    {renderDetailRow('Supplier', product.supplier)}
                    {renderDetailRow('Cost Price', `${product.costPrice}`)}
                    {renderDetailRow('For Sale', product.isforsale ? 'Yes' : 'No')}

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
                  
            </Card>
          </>
        )
      }
    </>
  );
};
export default ProductPage;