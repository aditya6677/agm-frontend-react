// material
import { Grid, Container, Typography, Button, Stack } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';


// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

const token = localStorage.getItem('token');


// ----------------------------------------------------------------------

export default function DashboardApp(props) {

  const [loader, setLoader] = useState(true);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.REACT_APP_BACKEND_API + '/info', requestOptions)
      .then(res => res.json())
      .then((result) => {
        setInfo(result.info);
        setLoader(false);
      })
      .catch((e) => {
        setInfo({});
      })
  }, [])


  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Hi, Welcome back</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/add"
            startIcon={<Icon icon={plusFill} />}
          >
            New Service
          </Button>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales puc = {info.puc || 0}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers ins = {info.ins || 0}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders fit = {info.fit || 0} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports today = {info.today} total = {info.total}/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
