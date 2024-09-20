import React from 'react';

// Displays a table of all events including their participation status
function VolunteerHistory({ events=[] }) {//defualt to an empty array
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Volunteer Event History</h1>
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
                    {/*FOR DEBUGGING PURPOSES*/}
                    {events.length === 0 ? (
                        <try>
                            <td colspan="7" className="text-center">No events found.</td>
    
                        </try>
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
