import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, Button, Container, Stack, Typography, Divider } from '@material-ui/core';
import Page from '../components/Page';
import { BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import Label from '../components/Label';

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
  }
}));

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' }
];



export default function Blog() {
  const classes = useStyles();
  const [vehicle, setVehicles] = useState([]);
  const [filterName, setFilterName] = useState('');


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
      .then(result => setVehicles(result.info))
  }, [])

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="Dashboard: Blog | Agrahari Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch filterName={filterName} onFilterName={handleFilterByName} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        {vehicle && vehicle.length > 0 ? vehicle.map((val, key) => {

          if (filterName != '') {
            if (!val.mobile.includes(filterName)) {
              if (!val.name.includes(filterName)) {
                if (!val.rcNumber.includes(filterName)) {
                  return;
                }
              }
            }
          }

          let puccDaysLeft = moment(val.pucExpiry).diff(moment(val.pucIssue), 'days') + 1 || '';
          let fitDaysLeft = moment(val.fitnessExpiry).diff(moment(val.fitnessIssue), 'days') + 1 || '';
          let insDaysleft = moment(val.insuranceExpiry).diff(moment(val.insuranceIssue), 'days') + 1 || '';
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
                      <span> <span className={classes.issuedOn}>Issued On </span> : {val.pucIssue ? moment(val.pucIssue).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span> <span className={classes.issuedOn}>Expiry On </span> : {val.pucExpiry ? moment(val.pucExpiry).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span> {puccDaysLeft ? puccDaysLeft + ' Days Left' : null}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      {puccDaysLeft === 0 || puccDaysLeft > 0 ? <Label variant="ghost" color={'success'}>Active</Label> : <Label variant="ghost" color={'error'}>Expired</Label>}

                    </Typography>
                  </Grid>
                </Grid>

                <Divider style={{ width: '100%' }} />

                <Grid container className={classes.parentBox}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.insHeading}>Insurance</span>
                      <span> <span className={classes.issuedOn}>Issued On </span> : {val.insuranceIssue ? moment(val.insuranceIssue).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span> <span className={classes.issuedOn}>Expiry On </span> : {val.insuranceExpiry ? moment(val.insuranceExpiry).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span> {insDaysleft ? insDaysleft + ' Days Left' : null}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      {insDaysleft === 0 || insDaysleft > 0 ? <Label variant="ghost" color={'success'}>Active</Label> : <Label variant="ghost" color={'error'}>Expired</Label>}
                    </Typography>
                  </Grid>
                </Grid>


                <Divider style={{ width: '100%' }} />

                <Grid container className={classes.parentBox}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span className={classes.fitHeading}>Fitness</span>
                      <span> <span className={classes.issuedOn}>Issued On </span> : {val.fitnessIssue ? moment(val.fitnessIssue).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span> <span className={classes.issuedOn}>Expiry On </span> : {val.fitnessExpiry ? moment(val.fitnessExpiry).format('MMM Do YYYY') : ''}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      <span> {fitDaysLeft ? fitDaysLeft + ' Days Left' : null}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Typography variant="body2" sx={{ opacity: 0.82 }}>
                      {fitDaysLeft === 0 || fitDaysLeft > 0 ? <Label variant="ghost" color={'success'}>Active</Label> : <Label variant="ghost" color={'error'}>Expired</Label>}
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
