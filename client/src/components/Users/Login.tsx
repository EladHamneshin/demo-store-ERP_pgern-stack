import * as React from 'react';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../utils/store/hooks';
import { saveEmail } from '../../utils/store/emailSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../Copyright';
import { isValidEmail, isValidPassword } from '../validateFuncs';
import { toastError } from '../toastUtils/toastUtils';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formEmail = data.get('email');
    const password = data.get('password');

    // if (formEmail !== null) {
    //   if (!isValidEmail(formEmail.toString())) {
    //     toastError("Email must be a valid email");
    //     // return
    //   }
    // }  // toastCheck

    // const {id, email} = loginUser(formEmail, password) // => waiting for the function
    // setUserEmail(email);
    // let myLink = userEmail === formEmail ? '/' : ''; 
  };

  return (
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // onChange={isValidPassword()}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                dispatch(saveEmail(userEmail));
                navigate('/')
              }}
            >
              Sign In
            </Button>
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
  );
}