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
    { value: '15', label: '15 Days' },
    { value: '10', label: '10 Days' },
    { value: '5', label: '5 Days' },
    { value: '2', label: '2 Days' },
    { value: '0', label: 'Expired' },
    { value: '', label: 'All' }
];



export default function Blog() {
    const classes = useStyles();
    const [vehicle, setVehicles] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterOption, setFilter] = useState('');
    const [loader, setLoader] = useState(true);



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


    return (
        <Page title="Dashboard: Fitness | Agrahari Management">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Fitness
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

                    let fitDaysLeft = moment(val.fitnessExpiry).diff(moment(new Date()), 'days') || '';

                    if (filterOption != '') {
                        if (fitDaysLeft > filterOption)
                            return;
                    }

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
