import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, Button, Container, Stack, Typography, Divider, TextField, MenuItem } from '@material-ui/core';
import Page from '../components/Page';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import Label from '../components/Label';
import CircularProgress from '@mui/material/CircularProgress';

const token = localStorage.getItem('token');

const useStyles = makeStyles((theme) => ({
  parentBox: {
    margin: '10px'
  },
  headings: {
    backgroundColor: '#d4f3db',
    borderRadius: '5px',
    padding: '3px'
  },
  pucHeading: {
    backgroundColor: '#f9c9a6',
    borderRadius: '5px',
    padding: '3px'
  },
  insHeading: {
    backgroundColor: '#cccbff',
    borderRadius: '5px',
    padding: '3px'
  },
  fitHeading: {
    backgroundColor: '#ecabcc',
    borderRadius: '5px',
    padding: '3px'
  },
  issuedOn: {
    fontWeight: 600
  },
  mobileSpan: {
    [theme.breakpoints.down(780)]: {
      display: 'block'
    }
  }
}));

const SORT_OPTIONS = [
  { value: '1', label: 'Latest' },
  { value: '0', label: 'Oldest' }
];



export default function Blog() {
  const classes = useStyles();
  const [vehicle, setVehicles] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterOption, setFilter] = useState(1);
  const [loader, setLoader] = useState(true);

  const sortAryByOldest = (ary) => {
    let newAry = ary.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    return newAry;
  }

  const sortAryByLatest = (ary) => {
    let newAry = ary.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    return newAry;
  }


  useEffect(() => {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.REACT_APP_BACKEND_API + '/getRcList', requestOptions)
      .then(res => res.json())
      .then((result) => {
        setVehicles(result.info);
        setLoader(false);
      })
      .catch((e) => {
        setVehicles([]);
      })
  }, [])

  let vehicleList = vehicle || [];
  if (vehicleList.length > 0 && filterOption && filterOption == 1) {
    vehicleList = sortAryByOldest(vehicle);
  }

  if (vehicleList.length > 0 && filterOption && filterOption == 0) {
    vehicleList = sortAryByLatest(vehicle);
  }

  return (
    <Page title="Dashboard: Vehicles | Agrahari Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Vehicles
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/add"
            startIcon={<Icon icon={plusFill} />}
          >
            New Vehicle
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <TextField id="standard-basic" label="Standard" color="success" autoComplete='off' variant="standard" onChange={e => setFilterName(e.target.value)} />
          <TextField
            id="outlined-select-currency"
            size="small"
            select
            label="Filter"
            value={filterOption}
            onChange={e => setFilter(e.target.value)}
            helperText="Please select days"
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {
          loader ? <Stack sx={{ color: 'grey.500', margin : '10px 0' }} spacing={2} direction="row" alignItems="center" justifyContent="center">
            <CircularProgress color="success" />
          </Stack> : null
        }

        {vehicleList.length > 0 ? vehicleList.map((val, key) => {

          if (filterName != '') {
            if (!val.mobile.includes(filterName)) {
              if (!val.name.includes(filterName)) {
                if (!val.rcNumber.includes(filterName)) {
                  return;
                }
              }
            }
          }

          let puccDaysLeft = moment(val.pucExpiry).diff(moment(new Date()), 'days') || '';
          let fitDaysLeft = moment(val.fitnessExpiry).diff(moment(new Date()), 'days') || '';
          let insDaysleft = moment(val.insuranceExpiry).diff(moment(new Date()), 'days') || '';


          return (
            <div key={key}>
              <Card>
                <Grid container className={classes.parentBox}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Typography variant="subtitle1" sx={{ opacity: 0.82 }}>
                      <span className={classes.headings}>RC Number </span> : {val.rcNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Typography variant="subtitle1" sx={{ opacity: 0.82 }}>
                      <span className={classes.headings}>Name </span> : {val.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Typography variant="subtitle1" sx={{ opacity: 0.82 }}>
                      <span className={classes.headings}>Mobile </span> : {val.mobile}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider style={{ width: '100%' }} />

                <Grid container className={classes.parentBox}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.pucHeading}>PUCC</span>
                      <span className={classes.mobileSpan}> <span className={classes.issuedOn}>Issued On </span> : {val.pucIssue ? moment(val.pucIssue).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.mobileSpan}> <span className={classes.issuedOn}>Expiry On </span> : {val.pucExpiry ? moment(val.pucExpiry).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.mobileSpan}> {puccDaysLeft && puccDaysLeft > 0 ? puccDaysLeft + ' Days Left' : null}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      {puccDaysLeft > 0 ? <Label variant="ghost" color={'success'}>Active</Label> : <Label variant="ghost" color={'error'}>Expired</Label>}

                    </Typography>
                  </Grid>
                </Grid>

                <Divider style={{ width: '100%' }} />

                <Grid container className={classes.parentBox}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.insHeading}>Insurance</span>
                      <span className={classes.mobileSpan}> <span className={classes.issuedOn}>Issued On </span> : {val.insuranceIssue ? moment(val.insuranceIssue).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.mobileSpan}> <span className={classes.issuedOn}>Expiry On </span> : {val.insuranceExpiry ? moment(val.insuranceExpiry).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.mobileSpan}> {insDaysleft && insDaysleft > 0 ? insDaysleft + ' Days Left' : null}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      {insDaysleft > 0 ? <Label variant="ghost" color={'success'}>Active</Label> : <Label variant="ghost" color={'error'}>Expired</Label>}
                    </Typography>
                  </Grid>
                </Grid>


                <Divider style={{ width: '100%' }} />

                <Grid container className={classes.parentBox}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.fitHeading}>Fitness</span>
                      <span className={classes.mobileSpan}> <span className={classes.issuedOn}>Issued On </span> : {val.fitnessIssue ? moment(val.fitnessIssue).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.mobileSpan}> <span className={classes.issuedOn}>Expiry On </span> : {val.fitnessExpiry ? moment(val.fitnessExpiry).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.mobileSpan}> {fitDaysLeft && fitDaysLeft > 0 ? fitDaysLeft + ' Days Left' : null}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      {fitDaysLeft > 0 ? <Label variant="ghost" color={'success'}>Active</Label> : <Label variant="ghost" color={'error'}>Expired</Label>}
                    </Typography>
                  </Grid>
                </Grid>

              </Card>

              <Box mt="15px" />
            </div>
          )

        }) : null
        }
      </Container>
    </Page>
  );
}
