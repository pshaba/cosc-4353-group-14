import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Make sure to set the root for accessibility when using react-modal

function VolunteerHistory({ events = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportType, setReportType] = useState(""); // Track which report is requested (Event or Volunteer)
    const [format, setFormat] = useState("csv"); // Default format to CSV

    // Function to open the modal and set the report type
    const openModal = (type) => {
        setReportType(type);
        setIsModalOpen(true);
    };

    // Function to handle report download based on format
    const downloadReport = () => {
        const url = `/volunteerHistory/report?type=${reportType.toLowerCase()}&format=${format}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No volunteer history records found");
                }
                return response.blob(); // Convert response to a blob
            })
            .then(blob => {
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = `${reportType.toLowerCase()}_report.${format}`; // Set filename based on format and type
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.error("Error downloading report:", error);
                alert("No records found or an error occurred.");
            })
            .finally(() => {
                setIsModalOpen(false); // Close the modal after download
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Volunteer Event History</h1>

            {/* Buttons to open the modal for Event or Volunteer report download */}
            <div className="mb-3">
                <button onClick={() => openModal('Event')} className="btn btn-primary mr-2">
                    Download Event Report
                </button>
                <button onClick={() => openModal('Volunteer')} className="btn btn-secondary">
                    Download Volunteer Report
                </button>
            </div>

            {/* Table displaying volunteer history */}
            <table className="table table-striped">
                <thead id="table_head" className="thead-light">
                    <tr>
                        <th>Event Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Required Skills</th>
                        <th>Urgency</th>
                        <th>Event Date</th>
                        <th>Status</th>  {/* Placeholder for Participation Status */}
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
                                <td>Attended</td>  {/* Placeholder value */}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal for selecting format */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Select Report Format"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Select Format for {reportType} Report</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="csv"
                            checked={format === 'csv'}
                            onChange={() => setFormat('csv')}
                        />
                        CSV
                    </label>
                    <label style={{ marginLeft: '20px' }}>
                        <input
                            type="radio"
                            value="pdf"
                            checked={format === 'pdf'}
                            onChange={() => setFormat('pdf')}
                        />
                        PDF
                    </label>
                </div>
                <div className="modal-actions" style={{ marginTop: '20px' }}>
                    <button onClick={downloadReport} className="btn btn-primary">Download</button>
                    <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                </div>
            </Modal>
        </div>
    );
}

export default VolunteerHistory;
