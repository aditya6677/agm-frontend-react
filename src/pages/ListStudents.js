import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'E. No', label: 'E. No', alignRight: false },
  { id: 'Name', label: 'Name', alignRight: false },
  { id: 'Father Name', label: 'Father Name', alignRight: false },
  { id: 'Traing Start Date', label: 'Traing Start Date', alignRight: false },
  { id: 'Traing End Date', label: 'Traing End Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
];

// ----------------------------------------------------------------------
const token = localStorage.getItem('token') || null;



export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERLIST, SetUser] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
    };
    fetch(process.env.REACT_APP_BACKEND_API + '/students', requestOptions)
      .then(res => res.json())
      .then(result => SetUser(result.info))
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const convertDDmmYYYYY = (newDate) => {
    newDate = new Date(newDate);
    const yyyy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1; // Months start at 0!
    let dd = newDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const today = dd + '/' + mm + '/' + yyyy;
    return today;
  }

  const checkExpire = (date) => {
    let testDate = new Date(date);
    let today = new Date();
    var a = moment(testDate);
    var b = moment(today);
    var diffDays = b.diff(a, 'days');
    if(diffDays < 0){
      return 'success'
    }
    else 
      return 'error'
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = USERLIST;

  const isUserNotFound = filteredUsers && filteredUsers.length === 0;

  return (
    <Page title="User | Shri-Agrahari">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Students
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/admission"
            startIcon={<Icon icon={plusFill} />}
          >
            New Admission
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST && USERLIST.length ? USERLIST.length : 0}
                  numSelected={selected.length}
                />
                <TableBody>
                  {filteredUsers && filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { enrollmnentNo, studentName, fatherName, trainigStartDate, trainingEndDate } = row;

                      const isExpired = checkExpire(trainingEndDate);
                      return (
                        <TableRow hover key={enrollmnentNo} tabIndex={-1}>
                          <TableCell align="left">{enrollmnentNo}</TableCell>
                          <TableCell align="left">{studentName}</TableCell>
                          <TableCell align="left">{fatherName}</TableCell>
                          <TableCell align="left">{convertDDmmYYYYY(trainigStartDate)}</TableCell>
                          <TableCell align="left">{convertDDmmYYYYY(trainingEndDate)}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={isExpired === 'error' ? 'error' : 'success'}
                            >
                              {isExpired == 'error' ? 'Trainig Complete' : 'Running'}

                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu data={row}/>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers && filteredUsers.length ? filteredUsers.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
