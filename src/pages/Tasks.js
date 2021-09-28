// material
import { Grid, Container, Typography, Button, Stack } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

// components
import Page from '../components/Page';
import {
  AppTasks
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp(props) {
  console.log(props.token);
  return (
    <Page title="Tasks | Minimal-UI">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tasks</Typography>
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
          <Grid item xs={12} md={12} lg={12}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
