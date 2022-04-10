import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

export const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.2,
  },
  { field: 'firstName', headerName: 'First name', flex: 0.7 },
  { field: 'lastName', headerName: 'Last name', flex: 0.7 },
  { field: 'email', headerName: 'Email adress', flex: 1 },
  { field: 'registration', headerName: 'Registration', type: 'date', flex: 1 },
  { field: 'lastVisit', headerName: 'Last visit', type: 'dateTime', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 0.5 },
];
export type UsersType = {
  id: number;
  firstName: string;
  email: string;
  registration: Date;
  lastVisit: Date;
  status: string;
};

type TablePropsType = {
  isLoading: boolean;
  rows: UsersType[];
};
export default function DataTable({ isLoading, rows }: TablePropsType) {
  return (
    <div style={{ height: '70vh', width: '100%', marginTop: '20px' }}>
      <DataGrid
        rows={rows}
        /*  getRowId={(row) => row.id} */
        columns={columns}
        components={{
          LoadingOverlay: LinearProgress,
        }}
        loading={isLoading}
        pageSize={40}
        autoHeight={true}
        rowsPerPageOptions={[10]}
        checkboxSelection
        /* onSelectionModelChange={(itm) => {
          const checked = itm.toString().split(',');
          const result = rows.filter((item) => checked.includes(item.id.toString()));
          console.log(checked);
          console.log(result);
        }} */
      />
    </div>
  );
}
