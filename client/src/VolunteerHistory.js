// src/VolunteerHistory.js
import React, { useState } from 'react';
import './VolunteerHistory.css';

function VolunteerHistory({ events = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [reportFormat, setReportFormat] = useState(''); //help track which format is wanted (CSV or PDF)
    const [reportType, setReportType] = useState(''); //help track which report is wanted (volunteer or event)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Function to open the modal
    //takes in reportType based on the selected button
    const openModal = (type) => {
        setReportType(type); //set report type based on the button clicked
        setShowModal(true); 
    }; 

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
        setReportFormat('');
        setStartDate('');
        setEndDate('');
    };

    // Function to handle format selection and download
    const handleDownload = () => {
        if (!reportFormat) {
            alert("Please select a format to download the report.");
            return;
        }

        if (!startDate || !endDate) {
            alert("Please select a start and end date for the report.");
            return;
        }

        // Determine which endpoint to call based on the format AND report type
        let endpoint = '';
        //if volunteer report type is chosen
        if (reportType === 'volunteer') {
            //endpoint is = reportFormat = whatever chosen chooses which reportController function to call on 
            endpoint = reportFormat === 'CSV'
                ? `/api/reports/generate-volunteer-csv`
                : `/api/reports/generate-volunteer-pdf`;
        } else if (reportType === 'event') {
            endpoint = reportFormat === 'CSV'
                ? `/api/reports/generate-event-csv`
                : `/api/reports/generate-event-pdf`;
        }

        // Fetch request to initiate download
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error downloading the report.");
                }
                return response.blob();
            })
            .then(blob => {
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `${reportType}_report.${reportFormat.toLowerCase()}`; //fixed to have the correct title based on reportType and reportFormat
                document.body.appendChild(link);
                link.click();
                link.remove();
                closeModal();
            })
            .catch(error => {
                console.error("Error downloading report:", error);
                alert("An error occurred while downloading the report.");
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Volunteer Event History</h1>

            <div className="mb-3">
            <button onClick={() => openModal('event')} className="btn btn-success mr-2">Download Event Report</button>
            <button onClick={() => openModal('volunteer')} className="btn btn-success">Download Volunteer Report</button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Required Skills</th>
                        <th>Urgency</th>
                        <th>Event Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">No events found.</td>
                        </tr>
                    ) : (
                        events.map((event, index) => (
                            <tr key={index}>
                                <td>{event.eventName}</td>
                                <td>{event.eventDescription}</td>
                                <td>{event.location}</td>
                                <td>{event.requiredSkills.join(', ')}</td>
                                <td>{event.urgency}</td>
                                <td>{event.eventDate}</td>
                                <td>Attended</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={closeModal}>&times;</button>
                        <h4>Select Report Format and Date Range</h4>
                        <p>Select the format for downloading the volunteer report:</p>
                        
                        {/* Date Selection */}
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="format-select"
                        />
                        
                        <label>End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="format-select"
                        />

                        {/* Format Selection as Dropdown */}
                        <select
                            value={reportFormat}
                            onChange={(e) => setReportFormat(e.target.value)}
                            className="format-select"
                        >
                            <option value="" disabled>Select format</option>
                            <option value="CSV">CSV</option>
                            <option value="PDF">PDF</option>
                        </select>

                        <div className="modal-actions mt-3">
                            <button onClick={handleDownload} className="btn btn-success btn-small">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VolunteerHistory;
