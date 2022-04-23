import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import carFill from '@iconify/icons-eva/car-fill';
import settingsFill from '@iconify/icons-eva/settings-fill';
import shakeOutline from '@iconify/icons-eva/shake-outline';
import calendarFill from '@iconify/icons-eva/calendar-fill';
// material
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

SiteItem.propTypes = {
  site: PropTypes.object
};

function SiteItem({ site }) {
  const { icon, value, name } = site;

  return (
    <Grid item xs={6}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{fShortenNumber(value)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default function AppTodayData(props) {
  const SOCIALS = [
    {
        name: 'Total Today',
        value: props?.data?.totalToday,
        icon: <Icon icon={personAddFill} color="#0f8409" width={32} height={32} />
      },
      {
        name: 'New PUCC',
        value: props?.data?.todayPucc,
        icon: <Icon icon={calendarFill} color="#0f8409" width={32} height={32} />
      },
      {
        name: 'New Fitness',
        value: props?.data?.todayFit,
        icon: <Icon icon={calendarFill} color="#0f8409" width={32} height={32} />
      },
      {
        name: 'New Insurance',
        value: props?.data?.todayIns,
        icon: <Icon icon={calendarFill} color="#0f8409" width={32} height={32} />
      }
  ];
  return (
    <Card>
      <CardHeader title="Today Entries" />
      <CardContent>
        <Grid container spacing={2}>
          {SOCIALS.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
