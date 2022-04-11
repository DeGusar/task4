import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { SnackType } from '../types/types';

export function Snack({ isOpen, handleClose }: SnackType) {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success">Account created</Alert>
    </Snackbar>
  );
}
export function SnackLoginYes({ isOpen, handleClose }: SnackType) {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success">Successfull login</Alert>
    </Snackbar>
  );
}
export function SnackBlocked({ isOpen, handleClose }: SnackType) {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="warning">You don&apos;t have permission to access.</Alert>
    </Snackbar>
  );
}
export function SnackBan({ isOpen, handleClose }: SnackType) {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success">Users successfully blocked </Alert>
    </Snackbar>
  );
}
export function SnackUnban({ isOpen, handleClose }: SnackType) {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success">Users successfully unblocked </Alert>
    </Snackbar>
  );
}
export function SnackDelete({ isOpen, handleClose }: SnackType) {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success">Users successfully deleted </Alert>
    </Snackbar>
  );
}
