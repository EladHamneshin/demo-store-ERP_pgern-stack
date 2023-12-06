import productsAPI from '../../../api/productsAPI';
import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddProduct from '../addProduct/AddProduct';
import AddProduct2 from '../addProduct/addProductBody2/AddProduct2';

const columns: GridColDef[] = [
  {
    field: 'productName',
    headerName: 'Product name',
    width: 170,
    editable: true,
  },
  {
    field: 'supplier',
    headerName: 'Supplier',
    width: 200,
    editable: true,
  },
  {
    field: 'costPrice',
    headerName: 'Cost price',
    width: 110,
    editable: true,
  },
  {
    field: 'salePrice',
    headerName: 'Sale price',
    width: 110,
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 110,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 500,
    editable: true,
  }
];


export default function HomeDashboard() {
  const navigate = useNavigate();
  const [productsArr, setProductsArr] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      const allProducts: Product[] = await productsAPI.getAllProducts();
      setProductsArr(allProducts);
    }
    getData()
  }, []);

  const rows = productsArr.map((product) => {
    
    return (
      {
        id: product.id,
        productName: product.name,
        supplier: product.supplier,
        costPrice: product.costPrice,
        salePrice: product.saleprice,
        quantity: product.quantity,
        description: product.description
      }
    )
  })

  const handleClick = (params: GridRowParams) => {
    navigate(`/erp/product/${params.row.id}`)
  }

  

  return (
    <Box sx={{ height: 445, width: '100%' }}>
      <br></br>
      <AddProduct />
      {/* <AddProduct2/> */}
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={handleClick}
        slots={{
          toolbar: GridToolbar
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnMenu
        sx={{
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer'
          },
          "& .MuiDataGrid-cellContent":
          {
            // whiteSpace: "normal",
            // lineHeight: "normal",
            // height: "unset !important",
            // maxHeight: "200px !important"
          }
        }}
      />
    </Box>
  );
}

