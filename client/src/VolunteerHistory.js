import React from 'react';

// Displays a table of all events including their participation status
function VolunteerHistory({ events = [] }) { // default to an empty array

    // Function to handle report download
    const downloadReport = (format) => {
        const url = `/volunteerHistory/report?format=${format}`;
        
        // Fetch the report from the server
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No volunteer history records found");
                }
                return response.blob(); // Convert response to a blob
            })
            .then(blob => {
                // Create a link element, set it to the blob URL, and trigger a download
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = `volunteer_report.${format}`; // Set filename based on format
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.error("Error downloading report:", error);
                alert("No volunteer history records found or an error occurred.");
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Volunteer Event History</h1>

            {/* Download buttons for CSV and PDF */}
            <div className="mb-3">
                <button onClick={() => downloadReport('csv')} className="btn btn-primary mr-2">
                    Download CSV Report
                </button>
                <button onClick={() => downloadReport('pdf')} className="btn btn-secondary">
                    Download PDF Report
                </button>
            </div>

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
                    {/* Maps over the events array to create a table row for each event */}
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
                                <td>Attended</td>  {/* Placeholder value for demo purposes */}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default VolunteerHistory;
