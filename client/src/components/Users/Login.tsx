import { useForm } from "react-hook-form";
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
import { emailValidet, passwordValidet } from "../validateFuncs";

const defaultTheme = createTheme();

export default function Login2Test() {
  const [Email, setEmail] = useState('');
  const [myLink, setMyLink] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: {errors, isValid} } = useForm();
  const onSubmit = (data) => {
      const email = data.email; 
      const password = data.password;
           
      // const {id, email} = loginUser(formEmail, password) // => waiting for the function
      // setEmail(email);
      // let myLink = errors.password&&errors.email ? '' : '/'; 
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
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email", emailValidet)}
                helperText ={errors.email?.message?.toString()}
                error={errors.email ? true : false}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", passwordValidet)}
                helperText={errors.password?.message?.toString()}
                error={errors.password ? true : false}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                    dispatch(saveEmail(Email));

                    console.log('all:', errors);
                    console.log('email error:',errors.email?.message);
                    console.log('password error:',errors.password?.message);
                    if (errors.password && errors.email) setMyLink('');
                    else if (!errors.password && !errors.email) setMyLink('/');
                    console.log('link:',myLink);
                    navigate(myLink)
                }}
                // disabled={!isValid}
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
    </>
  )
}
