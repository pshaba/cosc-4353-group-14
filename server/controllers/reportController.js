const db = require('../database');  // import database query module
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  // Import csv-writer
const PDFDocument = require('pdfkit');  // import PDFKit for generating PDFs
const fs = require('fs'); //file system module to save files locally with PDFs

// Generate volunteer participation history report (CSV)
async function generateVolunteerReportCSV(req, res) {
    const { startDate, endDate } = req.body; //get start and end date from request body

    try {
        //SQL query to fetch volunteer participation history within date range
        const query = `
            SELECT 
                u.full_name AS volunteer_name,
                u.email,
                e.event_name,
                vp.participation_date,
                vp.hours_volunteered,
                vp.role,
                e.location,
                e.urgency
            FROM 
                VolunteerParticipation vp
            JOIN 
                UserProfile u ON vp.user_id = u.user_id
            JOIN 
                EventDetails e ON vp.event_id = e.event_id
            WHERE 
                vp.participation_date BETWEEN ? AND ?
            ORDER BY 
                vp.participation_date DESC;
        `;

        //fetch results from the database
        const results = await db.query(query, [startDate, endDate]);

        // Define the CSV file structure with headers
        const csvWriter = createCsvWriter({
            path: './reports/volunteer_participation_report.csv', // Path where the CSV will be saved
            header: [
                { id: 'volunteer_name', title: 'Volunteer Name' },
                { id: 'email', title: 'Email' },
                { id: 'event_name', title: 'Event Name' },
                { id: 'participation_date', title: 'Participation Date' },
                { id: 'hours_volunteered', title: 'Hours Volunteered' },
                { id: 'role', title: 'Role' },
                { id: 'location', title: 'Location' },
                { id: 'urgency', title: 'Urgency' }
            ]
        });

        // Write the query results into the CSV file
        await csvWriter.writeRecords(results);

        //after writing to the CSV, send the file as a downloadd to the client
        res.download('./reports/volunteer_participation_report.csv'); // Send CSV file as download
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating volunteer CSV report');
    }
}

// Generate volunteer participation history report (PDF)
async function generateVolunteerReportPDF(req, res) {
    const { startDate, endDate } = req.body;  //get start and end date from request body

    try {
        //SQL query to fetch volunteer participation history within date range
        const query = `
            SELECT 
                u.full_name AS volunteer_name,
                u.email,
                e.event_name,
                vp.participation_date,
                vp.hours_volunteered,
                vp.role,
                e.location,
                e.urgency
            FROM 
                VolunteerParticipation vp
            JOIN 
                UserProfile u ON vp.user_id = u.user_id
            JOIN 
                EventDetails e ON vp.event_id = e.event_id
            WHERE 
                vp.participation_date BETWEEN ? AND ?
            ORDER BY 
                vp.participation_date DESC;
        `;

        //fetch results from the database
        const results = await db.query(query, [startDate, endDate]);

        //create a new PDF document using PDFKit
        const doc = new PDFDocument();
        const filePath = './reports/volunteer_participation_report.pdf'; //path where the PDF will be saved
        doc.pipe(fs.createWriteStream(filePath)); //Pipe the document to a file

        //add report title and date range
        doc.fontSize(18).text('Volunteer Participation Report', { align: 'center' });
        doc.fontSize(12).text(`Date Range: ${startDate} to ${endDate}`, { align: 'center' });
        doc.moveDown(2);

        //looop through the results and add each entry to the PDF
        results.forEach((entry) => {
            doc.text(`Volunteer: ${entry.volunteer_name} (${entry.email})`);
            doc.text(`Event: ${entry.event_name}`);
            doc.text(`Participation Date: ${entry.participation_date}`);
            doc.text(`Hours Volunteered: ${entry.hours_volunteered}`);
            doc.text(`Role: ${entry.role}`);
            doc.text(`Location: ${entry.location}`);
            doc.text(`Urgency: ${entry.urgency}`);
            doc.moveDown(1); //add space between entires
        });

        doc.end(); //finalize the PDF

        //after PDF is generated, send it as a download to the cliet
        doc.on('end', () => {
            res.download(filePath); // Provide the PDF file as a download
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating volunteer PDF report');
    }
}

// Generate event details report (CSV)
async function generateEventReportCSV(req, res) {
    const { startDate, endDate } = req.body; //get start and end date from request body

    try {
        //SQL query to fetch event details along with volunteer participation
        const query = `
            SELECT 
                e.event_name,
                e.description,
                e.location,
                e.event_date,
                e.urgency,
                u.full_name AS volunteer_name,
                u.email,
                vp.participation_date,
                vp.hours_volunteered,
                vp.role
            FROM 
                EventDetails e
            LEFT JOIN 
                VolunteerParticipation vp ON vp.event_id = e.event_id
            LEFT JOIN 
                UserProfile u ON vp.user_id = u.user_id
            WHERE 
                e.event_date BETWEEN ? AND ?
            ORDER BY 
                e.event_date DESC, vp.participation_date DESC;
        `;

        //fetch results from the database
        const results = await db.query(query, [startDate, endDate]);

        // Define the CSV file structure for event details
        const csvWriter = createCsvWriter({
            path: './reports/event_report.csv', // Path where the CSV will be saved
            header: [
                { id: 'event_name', title: 'Event Name' },
                { id: 'description', title: 'Description' },
                { id: 'location', title: 'Location' },
                { id: 'event_date', title: 'Event Date' },
                { id: 'urgency', title: 'Urgency' },
                { id: 'volunteer_name', title: 'Volunteer Name' },
                { id: 'email', title: 'Email' },
                { id: 'participation_date', title: 'Participation Date' },
                { id: 'hours_volunteered', title: 'Hours Volunteered' },
                { id: 'role', title: 'Role' }
            ]
        });

        // Write the query results into the CSV file
        await csvWriter.writeRecords(results);

        //after writing to the CSV, send the file as a download to the client
        res.download('./reports/event_report.csv'); // Send CSV file as download
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating event CSV report');
    }
}

// Generate event details report (PDF)
async function generateEventReportPDF(req, res) {
    const { startDate, endDate } = req.body; //get start and end date from request body

    try {
        //SQL query to fetch event details along with volunteer participation 
        const query = `
            SELECT 
                e.event_name,
                e.description,
                e.location,
                e.event_date,
                e.urgency,
                u.full_name AS volunteer_name,
                u.email,
                vp.participation_date,
                vp.hours_volunteered,
                vp.role
            FROM 
                EventDetails e
            LEFT JOIN 
                VolunteerParticipation vp ON vp.event_id = e.event_id
            LEFT JOIN 
                UserProfile u ON vp.user_id = u.user_id
            WHERE 
                e.event_date BETWEEN ? AND ?
            ORDER BY 
                e.event_date DESC, vp.participation_date DESC;
        `;

        //fetch results from the database
        const results = await db.query(query, [startDate, endDate]);

        //create a new PDF document using PDFKit
        const doc = new PDFDocument();
        const filePath = './reports/event_report.pdf';//path wehere the PDF will be saved
        doc.pipe(fs.createWriteStream(filePath)); //pipe the document to a file

        //add report title and date range
        doc.fontSize(18).text('Event Details Report', { align: 'center' });
        doc.fontSize(12).text(`Date Range: ${startDate} to ${endDate}`, { align: 'center' });
        doc.moveDown(2);

        //loop through the results and add each enetry to the PDF
        results.forEach((entry) => {
            doc.text(`Event: ${entry.event_name}`);
            doc.text(`Description: ${entry.description}`);
            doc.text(`Location: ${entry.location}`);
            doc.text(`Event Date: ${entry.event_date}`);
            doc.text(`Urgency: ${entry.urgency}`);
            doc.text(`Volunteer: ${entry.volunteer_name} (${entry.email})`);
            doc.text(`Participation Date: ${entry.participation_date}`);
            doc.text(`Hours Volunteered: ${entry.hours_volunteered}`);
            doc.text(`Role: ${entry.role}`);
            doc.moveDown(1);
        });

        doc.end(); //finalize the PDF

        //after PDF is generated, send it as a download to the cliet
        doc.on('end', () => {
            res.download(filePath); // Provide the PDF file as a download
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating event PDF report');
    }
}

module.exports = {
    generateVolunteerReportCSV,
    generateVolunteerReportPDF,
    generateEventReportCSV,
    generateEventReportPDF
};


