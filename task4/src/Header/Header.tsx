import { AppBar, Button, Toolbar } from '@mui/material';
import React from 'react';
type HeaderPropsType = {
  isAuthorised: boolean;
  handleLogout: React.MouseEventHandler<HTMLButtonElement>;
  handleLogin: React.MouseEventHandler<HTMLButtonElement>;
};

export function Header(props: HeaderPropsType) {
  const { isAuthorised, handleLogout, handleLogin } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        {isAuthorised ? (
          <Button variant="outlined" sx={{ ml: 5 }} color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="outlined" sx={{ ml: 5 }} color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
