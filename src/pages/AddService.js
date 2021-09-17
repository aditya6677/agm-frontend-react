import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
    Card,
    Stack,
    Button,
    Container,
    Typography,
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import React from 'react';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    response: {
        marginTop: theme.spacing(3),
    },
    result: {
        minWidth: '100%',
        margin: theme.spacing(2),
    },
    puccVal: {
        minHeight: '100%',
        minWidth:"60%"
    },
    name : {
        minWidth:"70%"
    }
}));

const handleSubmit = (e) => {
    e.preventDefault();
}

export default function AddService() {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);

    return (
        <Page title="User | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add Service
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={plusFill} />}
                    >
                        New Service
                    </Button>
                </Stack>

                <Card>
                    <Scrollbar>
                        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                            <TextField id="outlined-basic" label="Vehicle/Mobile Number" variant="outlined" required />
                            <Button className="searchVehicle" variant="contained" color="primary" type="submit">
                                Search Vehicle
                            </Button>
                        </form>
                    </Scrollbar>
                </Card>

                <Card className={classes.response}>
                    <form className={classes.result} autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container justifyContent="center" spacing={1}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField id="outlined-basic" label="Vehicle Number" variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField className={classes.name} id="outlined-basic" label="Name" variant="outlined" required />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField className={classes.name} id="outlined-basic" label="Mobile Number" variant="outlined" required />
                            </Grid>

                            <Box mt="75px" />

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Button className={classes.puccVal} variant="outlined" color="primary">
                                    PUCC Validity
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Expiry Date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>


                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Button className={classes.puccVal} variant="outlined" color="primary">
                                    Insurance Validity
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Expiry Date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>


                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Button className={classes.puccVal} variant="outlined" color="primary">
                                    Fitness Validity
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Expiry Date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                        </Grid>
                    </form>
                </Card>
            </Container>
        </Page>
    );
}
