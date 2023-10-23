import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  {
    id: 'index',
    label: 'index',
    minWidth: 50
  },
  {
    id: 'doctor',
    label: 'Doctor',
    minWidth: 100
  },
  {
    id: 'name',
    label: 'Full name',
    minWidth: 170,
  },
  {
    id: 'registrationDate',
    label: 'Registration Date)',
    minWidth: 170,
  },
  {
    id: 'appointmentDate',
    label: 'Appointment Date',
    minWidth: 170,
  },
];


export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleChangeAppointment(id) {
    props.onClickHideDetail(id);
  }

  return (
    <Paper sx={{
      width: '100%',
      overflow: 'hidden'
    }}>
      <TableContainer sx={{maxHeight: 440}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => handleChangeAppointment(row.id)}>
                    {columns?.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell  key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
