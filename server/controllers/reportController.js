const db = require('../database');  // import database query module
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  // Import csv-writer
const PDFDocument = require('pdfkit');  // import PDFKit for generating PDFs
const fs = require('fs'); //file system module to save files locally with PDFs

// Generate volunteer participation history report (CSV)
async function generateVolunteerReportCSV(req, res) {
    const { startDate, endDate } = req.body; //get start and end date from request body
    
    // console.log("start date: ", startDate);
    // console.log("End date: ", endDate);
    try {
        //SQL query to fetch volunteer participation history within date range
        const query = `
            SELECT DISTINCT
                u.full_name AS volunteer_name,
                e.event_name,
                vp.participation_date,
                vp.hours_volunteered,
                vp.role,
                e.location
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

         // Flatten the results array (if it's an array of arrays)
        const flattenedResults = results.flat();
        //console.log({results});
        // Define the CSV file structure with headers
        const csvWriter = createCsvWriter({
            path: './reports/volunteer_participation_report.csv', // Path where the CSV will be saved
            header: [
                { id: 'volunteer_name', title: 'Volunteer Name' },
                { id: 'event_name', title: 'Event Name' },
                { id: 'participation_date', title: 'Participation Date' },
                { id: 'hours_volunteered', title: 'Hours Volunteered' },
                { id: 'role', title: 'Role' },
                { id: 'location', title: 'Location' }   
            ]
        });

        // Write the query results into the CSV file
        await csvWriter.writeRecords(flattenedResults);

        //after writing to the CSV, send the file as a downloadd to the client
        res.download('./reports/volunteer_participation_report.csv'); // Send CSV file as download
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating volunteer CSV report');
    }
}

// Generate volunteer participation history report (PDF)
async function generateVolunteerReportPDF(req, res) {
    const { startDate, endDate } = req.body; // Get start and end date from request body

    try {
        // SQL query to fetch volunteer participation history within date range
        const query = `
            SELECT DISTINCT
                u.full_name AS volunteer_name,
                e.event_name,
                vp.participation_date,
                vp.hours_volunteered,
                vp.role,
                e.location
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

        // Fetch results from the database
        const results = await db.query(query, [startDate, endDate]);
        //console.log("Volunteer PDF Query results: ", results); //log query database results 

        //Flatten the results array (if it's an array of arrays)
        const flattenedResults = results.flat();

        // Log the results to ensure they are correctly formatted
        //console.log("Flattened Volunteer PDF Query Results", flattenedResults);

        if(flattenedResults.length === 0) {
            console.log('No results found for the given data range'); 
            res.status(404).send('No results found for the selected date range.'); 
            return; 
        }

        // Create a new PDF document using PDFKit
        const doc = new PDFDocument();
        const filePath = './reports/volunteer_participation_report.pdf'; // Path where the PDF will be saved
        doc.pipe(fs.createWriteStream(filePath)); // Pipe the document to a file

        // Add report title and date range
        doc.fontSize(18).text('Volunteer Participation Report', { align: 'center' });
        doc.fontSize(12).text(`Date Range: ${startDate} to ${endDate}`, { align: 'center' });
        doc.moveDown(2);

        // Loop through the results and add each entry to the PDF
        flattenedResults.forEach((entry) => {
            // Check if entry is missing any key data
            if (entry.volunteer_name && entry.event_name) {
                doc.text(`Volunteer: ${entry.volunteer_name}`);
                doc.text(`Event: ${entry.event_name}`);
                doc.text(`Participation Date: ${new Date(entry.participation_date).toLocaleDateString()}`);
                doc.text(`Hours Volunteered: ${entry.hours_volunteered}`);
                doc.text(`Role: ${entry.role}`);
                doc.text(`Location: ${entry.location}`);
                doc.moveDown(1); // Add space between entries
            } else {
                console.error('Missing required data in entry:', entry);
            }
        });

        doc.end(); // Finalize the PDF
        console.log("Volunteer PDF generation completed.\n"); 
        
        // After PDF is generated, send it as a download to the client
        res.download(filePath); 
    } catch (error) {
        console.error("Error generating PDF report", error);
        res.status(500).send('Error generating volunteer PDF report');
    }
}

// Generate event details report (CSV)
async function generateEventReportCSV(req, res) {
    const { startDate, endDate } = req.body; //get start and end date from request body

    try {
        //SQL query to fetch event details along with volunteer participation
        const query = `
            SELECT DISTINCT
                e.event_name,
                e.description,
                e.location,
                e.event_date,
                u.full_name AS volunteer_name,
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

        // Flatten the results array (if it's an array of arrays)
        const flattenedResults = results.flat();

        // Define the CSV file structure for event details
        const csvWriter = createCsvWriter({
            path: './reports/event_report.csv', // Path where the CSV will be saved
            header: [
                { id: 'event_name', title: 'Event Name' },
                { id: 'description', title: 'Description' },
                { id: 'location', title: 'Location' },
                { id: 'event_date', title: 'Event Date' },
                { id: 'volunteer_name', title: 'Volunteer Name' },
                { id: 'participation_date', title: 'Participation Date' },
                { id: 'hours_volunteered', title: 'Hours Volunteered' },
                { id: 'role', title: 'Role' }
            ]
        });

        // Write the query results into the CSV file
        await csvWriter.writeRecords(flattenedResults);

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
            SELECT DISTINCT
                e.event_name,
                e.description,
                e.location,
                e.event_date,
                e.urgency,
                u.full_name AS volunteer_name,
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
        console.log("Event PDF Query Results: ", results); 

        // Flatten the results array (if it's an array of arrays)
        const flattenedResults = results.flat();

        // Log the results to ensure they are correctly formatted
        console.log("Flattened Event PDF Query Results", flattenedResults);

        if(flattenedResults.length === 0) {
            console.log('No results found for the given data range'); 
            res.status(404).send('No results found for the selected date range.'); 
            return; 
        }
        
        //create a new PDF document using PDFKit
        const doc = new PDFDocument();
        const filePath = './reports/event_report.pdf';//path wehere the PDF will be saved
        doc.pipe(fs.createWriteStream(filePath)); //pipe the document to a file

        //add report title and date range
        doc.fontSize(18).text('Event Details Report', { align: 'center' });
        doc.fontSize(12).text(`Date Range: ${startDate} to ${endDate}`, { align: 'center' });
        doc.moveDown(2);

        //loop through the results and add each enetry to the PDF
        flattenedResults.forEach((entry) => {
            doc.text(`Event: ${entry.event_name || 'Unknown event.'}`);
            doc.text(`Description: ${entry.description || 'No description available.'}`);
            doc.text(`Location: ${entry.location || 'Location not provided'}`);
            doc.text(`Event Date: ${entry.event_date}`);
            doc.text(`Urgency: ${entry.urgency || 'N/A'}`);
            doc.text(`Volunteer: ${entry.volunteer_name || 'N/A'}`);
            doc.text(`Participation Date: ${entry.participation_date}`);
            doc.text(`Hours Volunteered: ${entry.hours_volunteered || 'N/A'}`);
            doc.text(`Role: ${entry.role || 'N/A'}`);
            doc.moveDown(1);
        });

        doc.end(); //finalize the PDF
        console.log("Event PDF generation completed.\n"); 

        // After PDF is generated, send it as a download to the client
        res.download(filePath); 
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


