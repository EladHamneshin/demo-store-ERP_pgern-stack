import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button, IconButton, Box, Paper, CircularProgress } from "@mui/material";
import { Card, CardMedia, CardContent } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useNavigate, useParams } from "react-router-dom";
import productsAPI from "../api/productsAPI";
import { useAppSelector } from '../utils/store/hooks';
// import {Product} from "../types/Product.ts";
// import StoreMap from "../components/StoreMap.tsx";
// import cartsAPI from "../api/cartsAPI.ts";
// import * as localstorage from "../utils/cartLocalStorageUtils.ts";
// import CartItem from "../types/CartItem.ts";
// import { toastError, toastSuccess } from "../utils/toastUtils.ts";
// import { UserContext } from "../UserContext.tsx";

interface IProduct {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  click: number;
  image: {
    alt: string;
    url: string;
  }
  coordinate: {
    longitude: number;
    latitude: number
  };
  costPrice: number;
  isForSale: boolean;
  supplier: string;
  tags: {
    [key: string]: string
  };
}

const ProductPage = () => {
  const { email } = useAppSelector((state) => state.email);
  const navigate = useNavigate();
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
  const [product, setProduct] = useState<null | IProduct>(null);
  // const [quantity, setQuantity] = useState<number>(1);
  // const context = useContext(UserContext)!;
  // const { userInfo, setProductsInCart} = context
  const { pid } = useParams();

  //handle get product by id from server
  const getProduct = async (pid: string) => {
    try {
      const product = await productsAPI.getProduct('84447cac-4bd3-441b-a7fc-2e5b82ab520e');
      setProduct(product);
    } catch (error) {
      console.error('Failed to fetch');
    };
  };

  //get the product after the page is rendered
  useEffect(() => {
    if (email === '') {
      navigate('/login');
    }
    getProduct(pid!);
  }, []);

  //handle decrease quantity by clicking on the minus button (when quantity shouldnt be lower then 1)
  // const decrementQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(prevQty => prevQty - 1);
  //   };
  // };


  //Navigate the user to edit product page
  const onEdit = () => {
    navigate(`/EditProduct/:{pid}`);
  };

  //Navigate the user to home page after click dalete product
  const onDelete = () => {
    ///delete the product
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
                    <Typography variant="h6">Primary Details</Typography>
                    {renderDetailRow('Name', product.name)}
                    {renderDetailRow('Sale Price', product.salePrice)}
                    {renderDetailRow('Quantity', product.quantity)}
                    {renderDetailRow('Description', product.description)}
                    {renderDetailRow('Category', product.category)}
                    {renderDetailRow('Discount Percentage', `${product.discountPercentage}%`)}
                    {renderDetailRow('Rating', product.rating)}
                    {renderDetailRow('Click', product.click)}

                    {/* Supplier Details */}
                    <Typography variant="h6">Supplier Details</Typography>
                    {renderDetailRow('Cost Price', product.costPrice)}
                    {renderDetailRow('For Sale', product.isForSale ? 'Yes' : 'No')}
                    {renderDetailRow('Supplier', product.supplier)}

                    {/* Stock Location Details */}
                    <Typography variant="h6">Stock Location Details</Typography>
                    {renderDetailRow('Longitude', product.coordinate.longitude)}
                    {renderDetailRow('Latitude', product.coordinate.latitude)}
                  </Grid>

                  {/* Right Side - Picture */}
                  <Grid item xs={5}>
                    <CardMedia
                      component="img"
                      // height="300"
                      image={product.image.url}
                      alt={product.image.alt}
                      style={{ objectFit: 'cover' }}
                    />
                    {/* Inventory Details */}
                    <Typography variant="h6">Inventory Details</Typography>
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