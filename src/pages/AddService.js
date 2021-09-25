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
import moment from 'moment';

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
        margin: theme.spacing(2),
    },
    puccVal: {
        minHeight: '100%',
        minWidth: "60%"
    },
    name: {
        minWidth: "70%"
    },
    updateButtonn: {
        marginTop: '20px',
        backgroundColor: "#2d75b5"
    }
}));


export default function AddService() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rcNumber: rcSearch })
        };
        const response = await fetch(process.env.REACT_APP_BACKEND_API + '/getRcDetails', requestOptions);
        const data = await response.json();
        setRecords(data);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
    }

    const handleForm = (e, formIndex, key) => {
        let newForm = [...records];
        if (!key) {
            e.preventDefault();
            newForm[formIndex][e.target.name] = e.target.value;
        } else {
            newForm[formIndex][key] = e.toString();;
        }
        setRecords(newForm);
    }

    const AddNewVehicle = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ info: newVehicle })
        };
        const response = await fetch(process.env.REACT_APP_BACKEND_API + '/addNewVehicle', requestOptions);
    }

    const handleNewForm = (e, key) => {
        let vehicle = { ...newVehicle };
        if (!key) {
            vehicle[e.target.name] = e.target.value;
        } else {
            vehicle[key] = e.toString();
        }
        setVehicle(vehicle);
    }

    const classes = useStyles();
    const [rcSearch, setRcSearch] = React.useState("");
    const [records, setRecords] = React.useState([]);
    const [newVehicle, setVehicle] = React.useState({
        rcNumber: null,
        name: null,
        mobile: null,
        pucIssue: null,
        pucExpiry: null,
        fitnessIssue: null,
        fitnessExpiry: null,
        insuranceIssue: null,
        insuranceExpiry: null
    });


    return (
        <Page title="Add Data | Agrahari Management">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add Service
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to='#'
                        startIcon={<Icon icon={plusFill} />}
                    >
                        New Service
                    </Button>
                </Stack>

                <Card>
                    <Scrollbar>
                        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                            <TextField id="outlined-basic" label="Vehicle/Mobile Number" variant="outlined" name="rcNumber" value={rcSearch} onChange={e => setRcSearch(e.target.value)} required />
                            <Button className="searchVehicle" variant="contained" color="primary" type="submit">
                                Search Vehicle
                            </Button>
                        </form>
                    </Scrollbar>
                </Card>

                {records && records.length > 0 ? records.map((val, key) => {
                    return (
                        <Card className={classes.response} key={key}>
                            <form className={classes.result} autoComplete="off" onSubmit={handleUpdate}>
                                <Grid container justifyContent="center" spacing={1}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField id="outlined-basic" label="Vehicle Number" variant="outlined" name="rcNumber" required onChange={e => handleForm(e, key, null)} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField className={classes.name} id="outlined-basic" label="Name" variant="outlined" name="name" required onChange={e => handleForm(e, key, null)} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField className={classes.name} id="outlined-basic" label="Mobile Number" variant="outlined" name="mobile" required onChange={e => handleForm(e, key, null)} />
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
                                                value={val.pucIssue}
                                                inputFormat={'dd/MM/yyyy'}
                                                onChange={e => handleForm(e, key, 'pucIssue')}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Expiry Date"
                                                value={val.pucExpiry}
                                                inputFormat={'dd/MM/yyyy'}
                                                onChange={e => handleForm(e, key, 'pucExpiry')}
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
                                                value={val.insuranceIssue}
                                                inputFormat={'dd/MM/yyyy'}
                                                onChange={e => handleForm(e, key, 'insuranceIssue')}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Expiry Date"
                                                value={val.insuranceExpiry}
                                                inputFormat={'dd/MM/yyyy'}
                                                onChange={e => handleForm(e, key, 'insuranceExpiry')}
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
                                                value={val.fitnessIssue}
                                                inputFormat={'dd/MM/yyyy'}
                                                onChange={e => handleForm(e, key, 'fitnessIssue')}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Expiry Date"
                                                value={val.fitnessExpiry}
                                                inputFormat={'dd/MM/yyyy'}
                                                onChange={e => handleForm(e, key, 'fitnessExpiry')}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Button className={classes.updateButtonn} variant="contained" type="submit">
                                        Update Vehicle
                                    </Button>
                                </Grid>
                            </form>
                        </Card>
                    )
                })
                    :
                    <Card className={classes.response}>
                        <form className={classes.result} autoComplete="off" onSubmit={AddNewVehicle}>
                            <Grid container justifyContent="center" spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField id="outlined-basic" label="Vehicle Number" variant="outlined" name="rcNumber" required onChange={e => handleNewForm(e)} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField className={classes.name} id="outlined-basic" label="Name" variant="outlined" name="name" required onChange={e => handleNewForm(e)} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField className={classes.name} id="outlined-basic" label="Mobile Number" variant="outlined" name="mobile" required onChange={e => handleNewForm(e)} />
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
                                            value={newVehicle.pucIssue}
                                            autoOk
                                            name="pucIssue"
                                            onChange={e => handleNewForm(e, 'pucIssue')}
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Expiry Date"
                                            inputFormat={'dd/MM/yyyy'}
                                            value={newVehicle.pucExpiry}
                                            name="pucExpiry"
                                            onChange={e => handleNewForm(e, 'pucExpiry')}
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
                                            value={newVehicle.insuranceIssue}
                                            name="insuranceIssue"
                                            onChange={e => handleNewForm(e, 'insuranceIssue')}
                                            inputFormat={'dd/MM/yyyy'}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Expiry Date"
                                            value={newVehicle.insuranceExpiry}
                                            name="insuranceExpiry"
                                            onChange={e => handleNewForm(e, 'insuranceExpiry')}
                                            inputFormat={'dd/MM/yyyy'}
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
                                            value={newVehicle.fitnessIssue}
                                            name="fitnessIssue"
                                            onChange={e => handleNewForm(e, 'fitnessIssue')}
                                            inputFormat={'dd/MM/yyyy'}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Expiry Date"
                                            value={newVehicle.fitnessExpiry}
                                            name="fitnessExpiry"
                                            onChange={e => handleNewForm(e, 'fitnessExpiry')}
                                            inputFormat={'dd/MM/yyyy'}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Button className={classes.updateButtonn} variant="contained" color="primary" type="submit">
                                    Add Vehicle
                                </Button>
                            </Grid>
                        </form>
                    </Card>
                }
            </Container>
        </Page>
    );
}
