import { Button } from "@mui/material";
import { FC } from "react";
import { SubmitButtonInterface } from "../../../types/addProductInterfaces/SubmitButtonInterface";
import { useNavigate } from "react-router-dom";
import productsAPI from "../../../api/productsAPI";
import { useAppSelector } from "../../../utils/store/hooks";
import { Product } from "../../../types/Product";

const SubmitButton: FC<SubmitButtonInterface> = ({
  isValid,
  watch,
  handle
}) => {
  const navigate = useNavigate();
  const categoryId = useAppSelector((state) => state.email.category);
  const isForSale = useAppSelector((state) => state.email.forSale);
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
    tags: {
      [watch('tagName')]: watch('tagVal')
    },
    isForSale: isForSale,
    supplier: watch('supplier')
  };

  const handleAddProduct = async () => {
    
    try {
      const newProduct = await productsAPI.addnewProduct(formProduct);
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
