import React from 'react';

// Displays a table of all events including their participation status
function VolunteerHistory({ events }) {
    return (
        <div>
            <h1>Volunteer Event History</h1>
            <table>
                <thead>
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
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.eventName}</td>
                            <td>{event.eventDescription}</td>
                            <td>{event.location}</td>
                            <td>{event.requiredSkills.join(', ')}</td>
                            <td>{event.urgency}</td>
                            <td>{event.eventDate}</td>
                            <td>Attended</td>  {/* Placeholder value for demo purposes */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VolunteerHistory;
