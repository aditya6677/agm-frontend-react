import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
    Card,
    Stack,
    Button,
    Container,
    Typography,
    Divider
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import React from 'react';
import Box from '@material-ui/core/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const token = localStorage.getItem('token') || null;

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
        minWidth: "60%",
        [theme.breakpoints.down(780)]: {
            width: '-webkit-fill-available;'
        }
    },
    name: {
        minWidth: "70%",
        [theme.breakpoints.down(780)]: {
            width: '-webkit-fill-available;'
        }
    },
    updateButtonn: {
        marginTop: '20px',
        backgroundColor: "#2d75b5"
    },
    deleteBtn: {
        marginTop: '20px',
        marginLeft : '20px',
        backgroundColor: "#b41010"
    },
    recordFound: {
        margin: '15px'
    },
    textFields: {
        [theme.breakpoints.down(780)]: {
            width: '-webkit-fill-available;'
        }
    },
    mobileForm : {
        [theme.breakpoints.down(780)]: {
            width: '100%',
            margin : '15px 10px',
            backgroundColor : 'darkgray'
        }
    }

}));


export default function AddService() {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            open: false,
            type: '',
            message: ''
        });
    };

    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token' : token },
            body: JSON.stringify({ rcNumber: (rcSearch).toUpperCase() })
        };
        fetch(process.env.REACT_APP_BACKEND_API + '/getRcDetails', requestOptions)
        .then(res => res.json())
        .then((result) => {
            setRecords(result);
            setLoader(false);
        })
        .catch((e)=>{
            setRecords([]);
        })
    }

    const handleUpdate = (e, key) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token' : token },
            body: JSON.stringify({ info: records[key] })
        };
        fetch(process.env.REACT_APP_BACKEND_API + '/updateVehicle', requestOptions)
            .then(response => response.json())
            .then((result) => {
                if (result.status == 200) {
                    setSnackbar({
                        open: true,
                        type: 'success',
                        message: result.message
                    })
                }
                else {
                    setSnackbar({
                        open: true,
                        type: 'error',
                        message: result.message
                    })
                }
            })
            .catch((e) => {

            });
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

    const AddNewVehicle = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token' : token },
            body: JSON.stringify({ info: newVehicle })
        };

        fetch(process.env.REACT_APP_BACKEND_API + '/addNewVehicle', requestOptions)
            .then(result => result.json())
            .then((response) => {
                if (response && response.status == 200) {
                    setSnackbar({
                        open: true,
                        type: 'success',
                        message: response.message
                    })
                }
                else {
                    setSnackbar({
                        open: true,
                        type: 'error',
                        message: response.message
                    })
                }
            }).catch((e) => {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'Vehicle Adding Failed'
                })
            })

    }

    const handleNewForm = (e, key) => {
        let vehicle = { ...newVehicle };
        if (!key) {
            vehicle[e.target.name] = (e.target.value).toUpperCase();
        } else {
            vehicle[key] = e.toString();
        }
        setVehicle(vehicle);
    }

    const classes = useStyles();
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        type: '',
        message: ''

    });

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
        insuranceExpiry: null,
        date : Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'})
    });
    const [loader, setLoader] = React.useState(false);


    return (
        <Page title="Add Data | Agrahari Management">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add Service
                    </Typography>
                    <Button
                        onClick={e => window.location.reload(false)}
                        startIcon={<Icon icon={plusFill} />}
                    >
                        New Service
                    </Button>
                </Stack>

                <Card>
                    <Scrollbar>
                        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                            <TextField className={classes.textFields} id="outlined-basic" label="Vehicle/Mobile Number" variant="outlined" name="rcNumber" value={rcSearch} onChange={e => setRcSearch((e.target.value).toUpperCase())} required />
                            <Button className={classes.textFields + ' searchVehicle'} variant="contained" color="primary" type="submit">
                                Search Vehicle
                            </Button>
                        </form>
                    </Scrollbar>
                </Card>

                {
                    loader ? <Stack sx={{ color: 'grey.500', margin : '10px 0' }} spacing={2} direction="row" alignItems="center" justifyContent="center">
                        <CircularProgress color="success" />
                    </Stack> : null
                }

                {records && records.length > 0 ? <Typography className={classes.recordFound} gutterBottom>
                    {records.length} Vehicle Found.
                </Typography> : null}

                {records && records.length > 0 ? records.map((val, key) => {
                    return (
                        <Card className={classes.response} key={key}>
                            <form className={classes.result} autoComplete="off" onSubmit={e => handleUpdate(e, key)}>
                                <Grid container justifyContent="center" spacing={1}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField className={classes.textFields} id="outlined-basic" label="Vehicle Number" variant="outlined" name="rcNumber" value={(val.rcNumber).toUpperCase()} required onChange={e => handleForm(e, key, null)} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField className={classes.name} id="outlined-basic" label="Name" variant="outlined" name="name" value={val.name} required onChange={e => handleForm(e, key, null)} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField className={classes.name} id="outlined-basic" label="Mobile Number" variant="outlined" name="mobile" value={val.mobile} error={val.mobile && val.mobile.length < 10 ? true : false} required onChange={e => handleForm(e, key, null)} />
                                    </Grid>

                                    <Box mt="75px" />
                                    <Divider className={classes.mobileForm} />

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
                                                renderInput={(params) => <TextField className={classes.textFields} {...params} />}
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
                                                renderInput={(params) => <TextField className={classes.textFields} {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>


                                    <Divider className={classes.mobileForm} />


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
                                                renderInput={(params) => <TextField className={classes.textFields} {...params} />}
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
                                                renderInput={(params) => <TextField className={classes.textFields} {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Divider className={classes.mobileForm} />


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
                                                renderInput={(params) => <TextField className={classes.textFields} {...params} />}
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
                                                renderInput={(params) => <TextField className={classes.textFields} {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Button className={classes.updateButtonn} variant="contained" type="submit">
                                        Update Vehicle
                                    </Button>
                                    <Button className={classes.deleteBtn} variant="contained">
                                        Delete Vehicle
                                    </Button>
                                </Grid>
                            </form>
                        </Card>
                    )
                })
                    :
                    <Card className={classes.response}>
                        <form className={classes.result} autoComplete="off" onSubmit={AddNewVehicle}>
                            <Typography gutterBottom>New Vehicle</Typography>
                            <Grid container justifyContent="center" spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField className={classes.textFields} id="outlined-basic" label="Vehicle Number" variant="outlined" name="rcNumber" required onChange={e => handleNewForm(e)} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField className={classes.name} id="outlined-basic" label="Name" variant="outlined" name="name" required onChange={e => handleNewForm(e)} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <TextField className={classes.name} id="outlined-basic" label="Mobile Number" variant="outlined" name="mobile" error={newVehicle.mobile && newVehicle.mobile.length < 10 ? true : false} required onChange={e => handleNewForm(e)} />
                                </Grid>

                                <Box mt="75px" />
                                <Divider className={classes.mobileForm} />

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
                                            renderInput={(params) => <TextField className={classes.textFields} {...params} />}
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
                                            renderInput={(params) => <TextField className={classes.textFields} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Divider className={classes.mobileForm} />

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
                                            renderInput={(params) => <TextField className={classes.textFields} {...params} />}
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
                                            renderInput={(params) => <TextField className={classes.textFields} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Divider className={classes.mobileForm} />


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
                                            renderInput={(params) => <TextField className={classes.textFields} {...params} />}
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
                                            renderInput={(params) => <TextField className={classes.textFields} {...params} />}
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
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Container>
        </Page>
    );
}
