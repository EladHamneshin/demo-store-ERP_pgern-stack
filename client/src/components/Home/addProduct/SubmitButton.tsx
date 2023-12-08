import { Button } from "@mui/material";
import { FC } from "react";
import { SubmitButtonInterface } from "../../../types/addProductInterfaces/SubmitButtonInterface";
import { useNavigate } from "react-router-dom";
import productsAPI from "../../../api/productsAPI";
import { useAppSelector } from "../../../store/hooks";
import { Product } from "../../../types/Product";

const SubmitButton: FC<SubmitButtonInterface> = ({
  isValid,
  watch,
  handle
}) => {
  const navigate = useNavigate();
  const categoryId = useAppSelector((state) => state.email.category);
  const isForSale = useAppSelector((state) => state.email.forSale);
  const Tags = useAppSelector((state) => state.tags.tags);
  const formProduct: Omit<Product, 'id'> = {
    name: watch("name"),
    category: categoryId,
    costPrice: parseInt(watch("costprice")),
    saleprice: parseInt(watch("salePrice")),
    quantity: parseInt(watch("quantity")),
    discount: parseInt(watch("discount")),
    description: watch("description"),
    rating: 0,
    clicked: 0,
    image: {
      url: watch('imgUrl'),
      alt: watch('imgAlt')
    },
    coordinate: {
      longitude: parseInt(watch('longitude')),
      latitude: parseInt(watch('latitude'))
    },
    tags: Tags!,
    isforsale: isForSale,
    supplier: watch('supplier')
  };

  const handleAddProduct = async () => {
    console.log('form:',formProduct);
    
    try {
      const newProduct = await productsAPI.addnewProduct(formProduct);
      console.log('newProduct:', newProduct);
      navigate(`/erp/product/${newProduct.id}`);
      handle();

    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <Button
        type="submit"
        // disabled={!isValid}
        onClick={handleAddProduct}
      >
        ADD
      </Button>
    </>
  );
};

export default SubmitButton;
