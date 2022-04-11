import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login } from '../services/services';
import { saveToLocalStorage } from '../localStorage/localStorage';

export default function SignIn(props: {
  handleClickLink: React.MouseEventHandler<HTMLAnchorElement>;
  handleSubmitSignIn: () => void;
}) {
  const [isPasswordError, setPasswordError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [textPasswordError, setTextPasswordError] = useState('');
  const [textEmailError, setTextEmailError] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = '' + data.get('email');
    const password = '' + data.get('password');
    try {
      const response = await login({
        email: email,
        password: password,
      });
      if (response.status === 200) {
        saveToLocalStorage(response.data.token, email);
        props.handleSubmitSignIn();
      }
    } catch (e) {
      const {
        response: { status },
      } = e;
      if (status === 401) {
        setEmailError(true);
        setTextEmailError('User with this email not found');
      }
      if (status === 402) {
        setPasswordError(true);
        setTextPasswordError('Wrong password');
      }
    }
  };

  return (
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
            error={isEmailError}
            helperText={textEmailError}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={() => {
              setEmailError(false);
              setTextEmailError('');
            }}
            onChange={() => {
              setEmailError(false);
              setTextEmailError('');
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            error={isPasswordError}
            helperText={textPasswordError}
            type="password"
            id="password"
            autoComplete="current-password"
            onBlur={() => {
              setPasswordError(false);
              setTextPasswordError('');
            }}
            onChange={() => {
              setPasswordError(false);
              setTextPasswordError('');
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={props.handleClickLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
