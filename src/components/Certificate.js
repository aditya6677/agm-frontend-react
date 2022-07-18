import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import {
    Card,
    Button,
} from '@material-ui/core';
import Scrollbar from '../components/Scrollbar';
import TextField from '@material-ui/core/TextField';
import logo from '../layouts/logo.png'


import '../theme/css/certificate.css'

const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <div class="certificate-container">
                <div class="certificate">
                    <div class="water-mark-overlay"></div>
                    <div class="certificate-header">
                        <img src='https://shriagrahari.in/static/media/logo.e9dce4f8.png' class="logo" alt="" />
                        <p>Certificate No : <b>{props.serialNumber}</b></p>
                    </div>
                    <div class="certificate-body">

                        <p class="certificate-title"><strong>SHRI AGHARI MOTOR DRIVING TRAINING SCHOOL, SIDDHARTH NAGAR</strong></p>
                        <h1>Certificate of Basic Driving Course</h1>
                        <div class="certificate-content">
                            <div class="about-certificate">
                                <p>
                                    THIS IS TO CERTIFY THAT MR/MS
                                </p>
                                <p class="student-name">{props.name}</p>
                            </div>
                            <p class="topic-title">
                                has successfully completed a BASIC DRIVING COURSE
                            </p>
                            <div class="text-center">
                                <p class="topic-description text-muted">comprising of both theory and practical at <span className='cursiveName'>Shri Agrahari Motor Driving Trainig School</span>,</p>
                                <p class="topic-description text-muted">Tetari Bazar, Naugarh, Siddharth Nagar</p>
                                {/* <p class="topic-description text-muted">from 11/11/2022 to 12/12/2023</p> */}

                            </div>
                        </div>
                        <div class="certificate-footer text-muted">
                            <div class="col-md-6">
                                <p>
                                    Manager
                                </p>
                            </div>
                            <div class="col-md-6">
                                <p>
                                    Trainer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});


export default function MyCertificate(props) {
    const componentRef = useRef();
    const [get, setGet] = React.useState(false);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const getCertificate = (e) => {
        e.preventDefault();
        setGet(true);
    }

    const handleChange = (e) => {
        setName((e.target.value).toUpperCase());
        setGet(false);
    }
    const [Name, setName] = React.useState('');
    const serialNumber = Math.floor(1000 + Math.random() * 9000);
    return (
        <>
            <div className='getCertificate'>
                <Card className='cardPadding'>
                    <Scrollbar>
                        <form className='getCertForm' onSubmit={getCertificate}>
                            <TextField className='textField' id="outlined-basic" label="Candidate Name" variant="outlined" name="rcNumber" value={Name} onChange={e => handleChange(e)} required />
                            <Button className='certBtn' variant="contained" color="primary" type="submit">
                                Get Certificate
                            </Button>
                        </form>
                    </Scrollbar>
                </Card>

            </div>
            {
                get ? <div style={{ textAlign: 'center' }}>
                        <ComponentToPrint ref={componentRef} name={Name} serialNumber={serialNumber}/>
                        <button onClick={handlePrint} className="printBtn">Print Certificate</button>
                        </div> 
                    : null
            }
            
        </>

    )
}