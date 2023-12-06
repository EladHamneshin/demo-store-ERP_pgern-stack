import { Button } from "@mui/material";
import { FC } from "react";
import { SubmitButtonInterface } from "./SubmitButtonInterface";
import { useNavigate } from "react-router-dom";
import productsAPI from "../../../../api/productsAPI";

const SubmitButton: FC<SubmitButtonInterface> = ({
  isValid,
  watch,
  handle
}) => {
  const navigate = useNavigate();
  const formProduct = {
    name: watch("name"),
    // category: watch("category"), // add watch to params!!!!
    costPrice: watch("costPrice"),
    saleprice: watch("salePrice"),
    quantity: watch("quantity"),
    discount: watch("discount"),
    description: watch("description"),
    rating: 0,
    clicked: 0,
    image: {
      url: watch('ImageUrl'),
      alt: watch('ImageAlt')
    },
    coordinate: {
      longitude: watch('longitude'),
      latitude: watch('latitude')
    },
    tags: {
      [watch('tagName')]: watch('tagValue')
    },
    // isForSale: isForSale, // fix!!!
    supplier: watch('supplier')
  };

  const handleAddProduct = async () => {
    
    try {
      // const newProduct = await productsAPI.addnewProduct(formProduct);
      console.log('newProduct:', formProduct);
      console.log('success!');
      // navigate(`/erp/product/${newProduct.id}`);
      handle();

    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <Button
        type="submit"
        disabled={!isValid}
        onClick={handleAddProduct}
      >
        ADD
      </Button>
    </>
  );
};

export default SubmitButton;
