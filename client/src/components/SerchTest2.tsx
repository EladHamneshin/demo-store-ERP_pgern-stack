import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, alpha, InputBase, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import productsAPI from '../api/productsAPI';
import { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function SearchTest2() {
  const navigate = useNavigate();
  const [searchRes, setSearchRes] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const allProduct = await productsAPI.getAllProducts();
      setSearchRes(allProduct);
    }
    getProducts()
  }, []);

  const handleSelectOption = (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value) {
      const selectedProduct = searchRes.find(product => product.name === value);
      if (selectedProduct) {
        navigate(`/erp/product/${selectedProduct.id}`);
        console.log('id:', selectedProduct.id);
        console.log('url: ', `/erp/product/${selectedProduct.id}`);
      }
    }
  }

  return (
    <Search>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={searchRes.map((option) => option.name)}
        onChange={handleSelectOption}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search…"
            // label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            sx={{ width: 300 }}
          />
        )}
      />
    </Search>
  )
}