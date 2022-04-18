import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {

    },
    section: {
        margin: '5px 20px',
        display: 'block',
        flexGrow: 1
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        margin : '2px 20px 30px 20px'
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeader: {
        width: "20%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol: {
        width: "20%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCellHeader: {
        margin: "auto",
        margin: 5,
        fontSize: 12,
        fontWeight: 500
    },
    tableCell: {
        margin: "auto",
        margin: 5,
        fontSize: 10
    },
    tableColHeaderDate: {
        width: "12%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeaderHour: {
        width: "24%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColDate: {
        width: "12%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHour: {
        width: "24%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
});

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const convertDDmmYYYYY = (newDate) => {
    newDate = new Date(newDate);
    const yyyy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1; // Months start at 0!
    let dd = newDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const today = dd + '/' + mm + '/' + yyyy;
    return today;
}

var rows = (startDate) => Array(30).fill().map(function (p, i) {
    let date = new Date(startDate);
    let newDate = date.addDays(i);
    let today = convertDDmmYYYYY(newDate);
    const isSunday = newDate.getDay() == 0;
    return (
        <View style={styles.tableRow} key={i}>
            <View style={styles.tableColDate}>
                <Text style={styles.tableCell}>{today}</Text>
            </View>
            <View style={styles.tableColHour}>
                <Text style={styles.tableCell}>{isSunday ? 'Sunday' : null}</Text>
            </View>
            <View style={styles.tableColHour}>
                <Text style={styles.tableCell}>{isSunday ? 'Sunday' : 'UP58T2012(H.G.V.)'}</Text>
            </View>
            <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{isSunday ? 'Sunday' : null}</Text>
            </View>
            <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{isSunday ? 'Sunday' : null}</Text>
            </View>
        </View>
    );
});

// Create Document Component
const MyDocument = (data) => (
    // <PDFViewer>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ fontSize: '15px', textAlign: 'center' }}>FORM 15 [See Rule 27(I)]</Text>
                    <Text style={{ fontSize: '15px', textAlign: 'center' }}>REGISTER SHOWING THE DRIVING HOURS SPENT BY A TRAINEE</Text>
                    <Text style={{ fontSize: '13px' }}>Name of the School/Establishment : Shri Agrahari Motor Driving School, Naugarh, Tetari Bazar, Siddharth Nagar</Text>
                    <Text style={{ fontSize: '12px', marginTop: '5px' }}>Name of Trainee : {data.studentName}</Text>
                    <Text style={{ fontSize: '12px' }}>Enrollment Number : {data.enrollmnentNo}</Text>
                    <Text style={{ fontSize: '12px' }}>Date of Enrollment : {convertDDmmYYYYY(data.trainigStartDate)}</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeaderDate}>
                            <Text style={styles.tableCellHeader}>Date</Text>
                        </View>
                        <View style={styles.tableColHeaderHour}>
                            <Text style={styles.tableCellHeader}>Hour Spent in Actual Driving From...hrs To...hrs</Text>
                        </View>
                        <View style={styles.tableColHeaderHour}>
                            <Text style={styles.tableCellHeader}>Class of Vehicle</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Signature of the Instructor</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Signature or Thumb-impression of Trainee</Text>
                        </View>
                    </View>
                    {rows(data.trainigStartDate)}
                </View>
            </Page>
        </Document>
    // </PDFViewer>

);

export default MyDocument;