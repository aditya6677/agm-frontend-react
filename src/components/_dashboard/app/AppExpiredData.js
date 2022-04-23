import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import carFill from '@iconify/icons-eva/car-fill';
import settingsFill from '@iconify/icons-eva/settings-fill';
import shakeOutline from '@iconify/icons-eva/shake-outline';
import stopFilled from '@iconify/icons-eva/stop-circle-fill'

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

export default function AppExpriredData(props) {
  const SOCIALS = [
    {
        name: 'Total Expired',
        value: props?.data?.totalExpired,
        icon: <Icon icon={stopFilled} color="#1877F2" width={32} height={32} />
      },
      {
        name: 'PUCC',
        value: props?.data?.expiredPuc,
        icon: <Icon icon={stopFilled} color="#DF3E30" width={32} height={32} />
      },
      {
        name: 'Fitness',
        value: props?.data?.expiredFitness,
        icon: <Icon icon={stopFilled} color="#DF3E30" width={32} height={32} />
      },
      {
        name: 'Insurance',
        value: props?.data?.expiredIns,
        icon: <Icon icon={stopFilled} color="#DF3E30" width={32} height={32} />
      }
  ];
  return (
    <Card>
      <CardHeader title="Exprired Data" />
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
