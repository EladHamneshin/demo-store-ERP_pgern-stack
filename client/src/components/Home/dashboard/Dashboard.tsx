import productsAPI from '../../../api/productsAPI';
import { useEffect, useState } from 'react';
import { DashboardProduct } from '../../../types/Product';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddProductComponent from '../addProduct/AddProductComponent';
import ROUTES from '../../../routes/routes';
import { Button, Typography } from '@mui/material';
import { useSubscription, useMutation } from "@apollo/client";
import { NEWS_SUBSCRIPTION } from '../../../graphQLQueries/subscriptions';
import { SEND_NEWS_EVENT } from '../../../graphQLQueries/Mutation';

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
    width: 140,
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
  const [productsArr, setProductsArr] = useState<DashboardProduct[]>([]);
  const [myTitle, setMyTitle] = useState('');
  const [myDescription, setMyDescription] = useState('');
  const [sendNews, newsData] = useMutation(SEND_NEWS_EVENT);
  const { data: subscriptionData } = useSubscription(NEWS_SUBSCRIPTION);

  useEffect(() => {
    const getData = async () => {
      const res = await productsAPI.getAllProductsGraphQL();
      const allProducts: DashboardProduct[] = res.data.getAllProducts;
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
        costPrice: product.costprice,
        salePrice: product.saleprice,
        quantity: product.quantity,
        description: product.description
      }
    )
  })

  const handleClick = (params: GridRowParams) => {
    navigate(`${ROUTES.PRODUCT_ROUTE}/${params.row.id}`)
  }
  useEffect(() => {
    if (newsData) {
      console.log('News data updated:', newsData);
    }
  }, [newsData]);

  useEffect(() => {
    if (subscriptionData) {
      console.log('Subscription data updated:', subscriptionData);
      setMyTitle(subscriptionData.newsFeed.title);
      setMyDescription(subscriptionData.newsFeed.description);
    }
  }, [subscriptionData]);

  const activateMutation = async () => {
    await sendNews({ variables: { title: 'Mr.Shub', description: "A.K.A Shablul" } })
  }

  return (
    <>
      <Button onClick={activateMutation}>print message</Button>
      <Typography>{`Title: ${myTitle}`}</Typography>
      <Typography>{`Description: ${myDescription}`}</Typography>
      
      <Box sx={{ height: '100%', width: '100%' }}>
        <br></br>
        <AddProductComponent />
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
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
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
    </>
  );
}

