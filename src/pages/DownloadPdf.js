import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {

    },
    section: {
        margin: 7,
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
        margin : '7px 7px 30px 7px'
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

var rows = (startDate) => Array(30).fill().map(function (p, i) {
    let date = new Date('Sun Apr 17 2022 23:52:31 GMT+0530 (India Standard Time)');
    let newDate = date.addDays(i);
    const yyyy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1; // Months start at 0!
    let dd = newDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const today = dd + '/' + mm + '/' + yyyy;
    const isSunday = newDate.getDay() == 0;
    return (
        <View style={styles.tableRow}>
            <View style={styles.tableColDate}>
                <Text style={styles.tableCell}>{today}</Text>
            </View>
            <View style={styles.tableColHour}>
                <Text style={styles.tableCell}>{isSunday ? 'Sunday' : null}</Text>
            </View>
            <View style={styles.tableColHour}>
                <Text style={styles.tableCell}>{isSunday ? 'Sunday' : null}</Text>
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
const RenderPdf = () => (
    <PDFViewer>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ fontSize: '16px', textAlign: 'center' }}>FORM 15</Text>
                    <Text style={{ fontSize: '16px', textAlign: 'center' }}>REGISTER SHOWING THE DRIVING HOUR SPENT BY A TRAINEE</Text>
                    <Text style={{ fontSize: '14px' }}>School/Establishment : Shree Agrahari Motor Driving School, Tetari Bazar, Siddharth Nagar</Text>
                    <Text style={{ fontSize: '13px', marginTop: '10px' }}>Name of Trainee : Shree Agrahari</Text>
                    <Text style={{ fontSize: '13px' }}>Enrollment Number : 113</Text>
                    <Text style={{ fontSize: '13px' }}>Date of Enrollment : 11/02/2022</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeaderDate}>
                            <Text style={styles.tableCellHeader}>Date</Text>
                        </View>
                        <View style={styles.tableColHeaderHour}>
                            <Text style={styles.tableCellHeader}>Hour Spent in Actual Driving</Text>
                        </View>
                        <View style={styles.tableColHeaderHour}>
                            <Text style={styles.tableCellHeader}>Class of Vehicle</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Signature of Instructor</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Thumb/Signature of Trainee</Text>
                        </View>
                    </View>
                    {rows(12)}
                </View>
            </Page>
        </Document>
    </PDFViewer>

);

export default RenderPdf;