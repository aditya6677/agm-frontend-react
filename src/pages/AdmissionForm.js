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
import MyDocument from 'src/components/PdfDocument';
import { pdf } from '@react-pdf/renderer';
import { Link as RouterLink } from 'react-router-dom';




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
    recordFound: {
        margin: '15px'
    },
    textFields: {
        [theme.breakpoints.down(780)]: {
            width: '-webkit-fill-available;'
        }
    },
    mobileForm: {
        [theme.breakpoints.down(780)]: {
            width: '100%',
            margin: '15px 10px',
            backgroundColor: 'darkgray'
        }
    }

}));

export default function AdmissionForm() {

    const [form, setForm] = React.useState({
        studentName : null,
        fatherName : null,
        dob : null,
        address : null,
        dlNumber : null,
        learningNumber : null,
        trainigStartDate : null,
        trainingEndDate : null,
    });

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const addStudent = async(e) => {
        e.preventDefault();
        const blob = await pdf(MyDocument('Hii')).toBlob();
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'file';
        a.click();
    }

    const handleForm = (e, key) => {
        let newform = { ...form };
        if (!key) {
            newform[e.target.name] = (e.target.value).toUpperCase();
        } else {
            if(key == 'trainigStartDate'){
                let date = new Date(e.toString());
                newform['trainingEndDate'] = date.addDays(30).toString();
            }
            newform[key] = e.toString();
        }
        setForm(newform);
    }

    const classes = useStyles();
    return (
        <Page title="Admission | Agrahari Management">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add Student
                    </Typography>
                    <Button
                            variant="contained"
                            component={RouterLink}
                            to="/dashboard/admission/list"
                            startIcon={<Icon icon={plusFill} />}
                    >
                        View Students
                    </Button>
                </Stack>
                <Card style={{ padding: '20px' }}>
                    <form autoComplete="off" onSubmit={e => addStudent(e)}>
                        <div style={{ display: 'flex' }}>
                            <TextField
                                style={{ width: '50%', marginRight: '10px' }}
                                required
                                id="outlined-required"
                                label="Name"
                                name="studentName"
                                onChange={e => handleForm(e)}
                            />
                            <TextField
                                style={{ width: '50%' }}
                                required
                                id="outlined-required"
                                label="Father Name"
                                name='fatherName'
                                onChange={e => handleForm(e)}
                            />
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <TextField
                                style={{ width: '50%', marginRight: '10px' }}
                                required
                                id="outlined-required"
                                label="Address"
                                name='address'
                                onChange={e => handleForm(e)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="DOB"
                                    name="dob"
                                    value={form.dob}
                                    inputFormat={'dd/MM/yyyy'}
                                    onChange={e => handleForm(e, 'dob')}
                                    renderInput={(params) => <TextField style={{ width: '50%' }} {...params} />}
                                />
                            </LocalizationProvider>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <TextField
                                style={{ width: '50%', marginRight: '10px' }}
                                id="outlined-required"
                                label="DL Number"
                                name='dlNumber'
                                onChange={e => handleForm(e)}
                            />
                            <TextField
                                style={{ width: '50%' }}
                                id="outlined-required"
                                label="Learning Number"
                                name='learningNumber'
                                onChange={e => handleForm(e)}
                            />
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Trainig Start Date"
                                    name="trainingStartDate"
                                    value={form.trainigStartDate}
                                    inputFormat={'dd/MM/yyyy'}
                                    onChange={e => handleForm(e, 'trainigStartDate')}
                                    renderInput={(params) => <TextField style={{ width: '50%', marginRight: '10px' }} {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disabled
                                    label="Training End Date"
                                    name="trainingEndDate"
                                    value={form.trainingEndDate}
                                    inputFormat={'dd/MM/yyyy'}
                                    onChange={e => handleForm(e, 'trainingEndDate')}
                                    renderInput={(params) => <TextField style={{ width: '50%' }} {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{textAlign : 'center'}}>
                            <Button className={classes.updateButtonn} variant="contained" color="primary" type="submit">
                                Add Student
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </Page>
    )
}