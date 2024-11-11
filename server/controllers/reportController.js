const db = require('../database');  // Your database query module
const { parse } = require('json2csv');  // For generating CSV files
const PDFDocument = require('pdfkit');  // For generating PDFs
const fs = require('fs');

// Generate volunteer participation history report (CSV)
async function generateVolunteerReportCSV(req, res) {
    const { startDate, endDate } = req.body;

    try {
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
        const results = await db.query(query, [startDate, endDate]);

        const csv = parse(results);
        res.header('Content-Type', 'text/csv');
        res.attachment('volunteer_participation_report.csv');
        res.send(csv);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating volunteer CSV report');
    }
}

// Generate volunteer participation history report (PDF)
async function generateVolunteerReportPDF(req, res) {
    const { startDate, endDate } = req.body;

    try {
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
        const results = await db.query(query, [startDate, endDate]);

        const doc = new PDFDocument();
        const filePath = './reports/volunteer_participation_report.pdf';
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(18).text('Volunteer Participation Report', { align: 'center' });
        doc.fontSize(12).text(`Date Range: ${startDate} to ${endDate}`, { align: 'center' });
        doc.moveDown(2);

        results.forEach((entry) => {
            doc.text(`Volunteer: ${entry.volunteer_name} (${entry.email})`);
            doc.text(`Event: ${entry.event_name}`);
            doc.text(`Participation Date: ${entry.participation_date}`);
            doc.text(`Hours Volunteered: ${entry.hours_volunteered}`);
            doc.text(`Role: ${entry.role}`);
            doc.text(`Location: ${entry.location}`);
            doc.text(`Urgency: ${entry.urgency}`);
            doc.moveDown(1);
        });

        doc.end();

        doc.on('end', () => {
            res.download(filePath);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating volunteer PDF report');
    }
}

// Generate
