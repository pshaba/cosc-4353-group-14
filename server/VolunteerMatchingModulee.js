// volunteerMatcher.js
class VolunteerMatcher {
    constructor(volunteers, events) {
        this.volunteers = volunteers;  // Array of volunteer profiles
        this.events = events;  // Array of event details
    }

    matchVolunteers() {
        let matches = [];
        this.events.forEach(event => {
            let matchedVolunteers = [];
            this.volunteers.forEach(volunteer => {
                if (this.isMatch(volunteer, event)) {
                    matchedVolunteers.push(volunteer);
                }
            });
            matches.push({
                event: event.name,
                matchedVolunteers: matchedVolunteers
            });
        });
        return matches;
    }

    isMatch(volunteer, event) {
        // Check if volunteer has required skills for the event
        const hasSkills = event.skills.every(skill => volunteer.skills.includes(skill));
        if (!hasSkills) return false;

        // Check if volunteer is in the same location as the event
        if (volunteer.location !== event.location) return false;

        // Check if volunteer is available on the event date
        const isAvailable = volunteer.availability.includes(event.date);
        return isAvailable;
    }
}

module.exports = VolunteerMatcher;
