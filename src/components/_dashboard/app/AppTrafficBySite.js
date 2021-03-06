import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import carFill from '@iconify/icons-eva/car-fill';
import settingsFill from '@iconify/icons-eva/settings-fill';
import shakeOutline from '@iconify/icons-eva/shake-outline';

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

export default function AppTrafficBySite(props) {
  const SOCIALS = [
    {
      name: 'Students',
      value: props?.student?.totalStudent,
      icon: <Icon icon={personAddFill} color="#f79432" width={32} height={32} />
    },
    {
      name: 'PUCC',
      value: props?.vehicle?.puccList,
      icon: <Icon icon={carFill} color="#f79432" width={32} height={32} />
    },
    {
      name: 'Fitness',
      value: props?.vehicle?.fitList,
      icon: <Icon icon={settingsFill} color="#f79432" width={32} height={32} />
    },
    {
      name: 'Insurance',
      value: props?.vehicle?.insList,
      icon: <Icon icon={shakeOutline} color="#f79432" width={32} height={32} />
    }
  ];
  return (
    <Card>
      <CardHeader title="Total Data" />
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
