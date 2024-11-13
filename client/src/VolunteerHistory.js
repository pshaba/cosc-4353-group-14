import React, { useState } from 'react';
import './VolunteerHistory.css';

function VolunteerHistory({ events = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [reportFormat, setReportFormat] = useState('');

    // Function to open the modal
    const openModal = () => setShowModal(true);

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
        setReportFormat('');
    };

    // Function to handle format selection and download
    const handleDownload = () => {
        if (!reportFormat) {
            alert("Please select a format to download the report.");
            return;
        }

        const url = `/volunteerHistory/report?format=${reportFormat.toLowerCase()}`;
        fetch(url)
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
                link.download = `volunteer_report.${reportFormat.toLowerCase()}`;
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
                <button onClick={openModal} className="btn btn-success mr-2">Download Event Report</button>
                <button onClick={openModal} className="btn btn-secondary">Download Volunteer Report</button>
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
                        <h4>Select Report Format</h4>
                        <p>Select the format for downloading the volunteer report:</p>
                        
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
                            <button onClick={closeModal} className="btn btn-danger btn-small">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VolunteerHistory;
