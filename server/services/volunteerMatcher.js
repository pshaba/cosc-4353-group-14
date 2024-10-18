// services/volunteerMatcher.js
class VolunteerMatcher {
    constructor(volunteers, events) {
        this.volunteers = volunteers;
        this.events = events;
    }

    matchVolunteers() {
        const matches = [];

        this.volunteers.forEach(volunteer => {
            this.events.forEach(event => {
                if (volunteer.skills.includes(event.requiredSkills[0])) {
                    matches.push({ volunteer: volunteer.name, event: event.name });
                }
            });
        });

        return matches;
    }
}

module.exports = VolunteerMatcher;
