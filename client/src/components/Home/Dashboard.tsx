import productsAPI from '../../api/productsAPI';
import { useEffect, useState } from 'react';
import {Product} from '../../types/Product';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ROUTES from '../../routes/routes';

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
        salePrice: product.salePrice,
        quantity: product.quantity,
        // description: <div>'hay'</div>
        description: product.description
      }
    )
  })


  const handleClick = (params: GridRowParams) => {
    navigate(`/erp/product/${params.row.id}`);
  };
  
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {/* <Typography variant="h4" component="h2">
        Products
      </Typography> */}
      <br></br>
      <Button variant="contained">
        Add product
      </Button>
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
              pageSize: 5,
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

export function BasicAccordion(summary: string, details: string) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{details}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
