import React, { useState } from 'react';
import EventManagementForm from './EventManagementForm';
import VolunteerHistory from './VolunteerHistory';

// Manages the overall event state and integrates child components
function EventManager() {
    const [events, setEvents] = useState([]);  // Holds the array of event data

    // Function to add new events to the state
    const handleAddEvent = (newEvent) => {
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    return (
        <div>
            <EventManagementForm onAddEvent={handleAddEvent} />
            <VolunteerHistory events={events} />
        </div>
    );
}

export default EventManager;
