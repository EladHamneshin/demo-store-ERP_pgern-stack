import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ROUTES from '../routes/routes';
import { useNavigate } from 'react-router-dom';

export default function notFoundPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={handleClick}>Back Home</Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
