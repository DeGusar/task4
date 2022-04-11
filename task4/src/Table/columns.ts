import { GridValueFormatterParams } from '@mui/x-data-grid';
import date from 'date-and-time';
export const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 0.5,
  },
  { field: 'firstName', headerName: 'First name', flex: 0.7 },
  { field: 'lastName', headerName: 'Last name', flex: 0.7 },
  { field: 'email', headerName: 'Email adress', flex: 1 },
  {
    field: 'registration',
    headerName: 'Registration',
    type: 'date',
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      const dateParams = new Date(params.value);
      return date.format(dateParams, 'MMM DD YYYY');
    },
  },
  {
    field: 'lastVisit',
    headerName: 'Last visit',
    type: 'dateTime',
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      const dateParams = new Date(params.value);
      return date.format(dateParams, 'MMM DD YYYY, HH:mm:ss');
    },
  },
  { field: 'status', headerName: 'Status', flex: 0.5 },
];
