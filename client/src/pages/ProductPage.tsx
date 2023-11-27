import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Card, CardMedia, CardContent, Button, IconButton, Box, Paper, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import productsAPI from "../api/productsAPI";
import { useAppSelector } from '../utils/store/hooks';
import { Product } from "../types/Product.ts";
// import { toastError, toastSuccess } from "../utils/toastUtils.ts";
// import { UserContext } from "../UserContext.tsx";

const ProductPage = () => {
  const { email } = useAppSelector((state) => state.email);
  const navigate = useNavigate();
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
  const [product, setProduct] = useState<null | Product>(null);
  // const context = useContext(UserContext)!;
  // const { userInfo, setProductsInCart} = context
  const { pid } = useParams();
  
  
  //handle get product by id from server
  const getProduct = async (pid: string) => {
    try {
      console.log(pid, 'pid fron params');
      const product = await productsAPI.getProduct(pid);
      setProduct(product);
    } catch (error) {
      console.error('Failed to fetch', error);
    };
  };
  
  //get the product after the page is rendered
  useEffect(() => {
    if (email === '') {
      // navigate('/login');
    }
    getProduct(pid!);
  }, []);

  //show modal component to edit product
  const onEdit = () => {
    /// modal component
    navigate(`/EditProduct/:{pid}`);
  };

  //Navigate the user to home page after click dalete product
  const onDelete = () => {
    ///delete the product
    productsAPI.deleteProduct(pid!)
    navigate(`/HomePage`);
  };


  //When the product is loaded then show the component
  return (
    <>
      {
        !product ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : product && (
          <>
            <Card>
              <CardContent>
                {/* Title */}
                <Typography variant="h5">Product Details</Typography>

                <Grid container spacing={2}>
                  {/* Left Side - Details */}
                  <Grid item xs={6}>
                    {/* Primary Details */}
                    {renderTitle('Primary Details')}
                    {renderDetailRow('Name', product.name)}
                    {renderDetailRow('Sale Price', product.salePrice)}
                    {renderDetailRow('Quantity', product.quantity)}
                    {renderDetailRow('Description', product.description)}
                    {renderDetailRow('Category', product.category)}
                    {renderDetailRow('Discount Percentage', `${product.discountPercentage}%`)}
                    {renderDetailRow('Rating', product.rating)}
                    {renderDetailRow('Click', product.click)}

                    {/* Supplier Details */}
                    {renderTitle('Supplier Details')}
                    {renderDetailRow('Cost Price', product.costPrice)}
                    {renderDetailRow('For Sale', product.isForSale ? 'Yes' : 'No')}
                    {renderDetailRow('Supplier', product.supplier)}

                    {/* Stock Location Details */}
                    {renderTitle('Stock Location Details')}
                    {renderDetailRow('Longitude', product.coordinate.longitude)}
                    {renderDetailRow('Latitude', product.coordinate.latitude)}
                  </Grid>

                  {/* Right Side - Picture */}
                  <Grid item xs={5}>
                    <Paper>
                      <CardMedia
                        component="img"
                        // height="300"
                        image={product.image.url}
                        alt={product.image.alt}
                        style={{ objectFit: 'cover' }}
                      />

                    </Paper>
                    {/* Inventory Details */}
                    {renderTitle('Inventory Details')}
                    {Object.entries(product.tags).map(([key, value]) => (
                      <Grid container item xs={12} key={key}>
                        <Grid item xs={4}>
                          <Typography variant="subtitle1">{key}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{value}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* Buttons for Edit and Delete */}
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={onEdit}>
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="error" onClick={onDelete}>
                      Delete
                    </Button>
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