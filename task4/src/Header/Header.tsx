import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { HeaderPropsType } from '../types/types';

export function Header(props: HeaderPropsType) {
  const { isAuthorised, handleLogout, handleLogin, userEmail } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        {isAuthorised ? (
          <>
            <Button variant="outlined" sx={{ ml: 5 }} color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1, ml: 4 }}>
              {userEmail}
            </Typography>
          </>
        ) : (
          <Button variant="outlined" sx={{ ml: 5 }} color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
