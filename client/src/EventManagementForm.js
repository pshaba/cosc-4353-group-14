import React, { useState } from 'react';
import "./EventManagmentForm.css" // Custom CSS

function EventManagementForm() {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        location: '',
        requiredSkills: [],
        urgency: '',
        eventDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMultiSelectChange = (e) => {
        const options = e.target.options;
        const selectedOptions = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOptions.push(options[i].value);
            }
        }
        setFormData(prevState => ({
            ...prevState,
            requiredSkills: selectedOptions
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // You might want to do some more form validation or sending data to server here
    };

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>
            <h2 className="mb-4">Event Management</h2>
            <div clasName="mb=3">
                <label className="form-label" htmlFor="eventName">Event Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="eventName"
                    name="eventName"
                    required
                    maxLength="100"
                    value={formData.eventName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="eventDescription">Event Description:</label>
                <textarea
                    className="form-control"
                    id="eventDescription"
                    name="eventDescription"
                    required
                    value={formData.eventDescription}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="location">Location:</label>
                <textarea
                    className="form-control"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="requiredSkills">Required Skills:</label>
                <select
                    className="form-select"
                    multiple
                    id="requiredSkills"
                    name="requiredSkills"
                    required
                    value={formData.requiredSkills}
                    onChange={handleMultiSelectChange}
                >
                    <option value="skill1">Skill 1</option>
                    <option value="skill2">Skill 2</option>
                    <option value="skill3">Skill 3</option>
                    <option value="skill4">Skill 4</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="urgency">Urgency:</label>
                <select
                    className="form-select"
                    id="urgency"
                    name="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleInputChange}
                >
                    <option value="">Select Urgency</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="eventDate">Event Date:</label>
                <input
                    className="form-control"
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                />
            </div>
            <button className="btn btn-primary" id="submit_btn" type="submit">Submit</button>
        </form>
    );
}

export default EventManagementForm;
