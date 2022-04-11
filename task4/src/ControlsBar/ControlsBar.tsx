import { Button, Container, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import React from 'react';

type ControlBarType = {
  handleClickBlock: React.MouseEventHandler<HTMLButtonElement>;
  handleClickUnblock: React.MouseEventHandler<HTMLButtonElement>;
  handleClickDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleClickAdd: React.MouseEventHandler<HTMLButtonElement>;
};

export function ControlBar({
  handleClickBlock,
  handleClickUnblock,
  handleClickDelete,
  handleClickAdd,
}: ControlBarType) {
  return (
    <Container
      maxWidth={false}
      sx={{ mt: 2, justifyContent: 'space-between', flexWrap: 'nowrap', display: 'flex' }}
    >
      <Box sx={{ pl: 5 }}>
        <Button variant="contained" onClick={handleClickBlock}>
          Block
        </Button>
        <Button
          sx={{ ml: 1 }}
          variant="contained"
          onClick={handleClickUnblock}
          startIcon={<SettingsBackupRestoreIcon />}
        >
          Unblock
        </Button>
        <Button
          sx={{ ml: 1 }}
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleClickDelete}
        >
          Delete
        </Button>
      </Box>
      <Button variant="contained" sx={{ mr: 5 }} onClick={handleClickAdd}>
        Add users
      </Button>
    </Container>
  );
}
