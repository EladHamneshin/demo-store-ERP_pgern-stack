import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import LoginField from './LoginField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../Copyright';
import { useAppDispatch } from '../../utils/store/hooks';
import { saveEmail } from '../../utils/store/emailSlice';
import userApi from '../../api/userAPI';

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useAppDispatch();

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formEmail = data.get('email')?.toString();
    const password = data.get('passowrd')?.toString();
    try {
      const {id, email} = await userApi.loginUser(formEmail, password);
      dispatch(saveEmail(formEmail!)) 
    } catch(error) {
      console.error(error);
    }

  };

  
  return (
    <>
     <ThemeProvider theme={defaultTheme}>
     <Container component="main" maxWidth="xs">
        <CssBaseline />
            <Box
              sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <LoginField />                
                <Grid container>
                    <Grid item>
                        <Link href='/register' variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
              </Box>    
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
     </ThemeProvider>
    </>
  )
}
