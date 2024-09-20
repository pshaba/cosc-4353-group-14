// document.addEventListener('DOMContentLoaded', () => {
//     const notifications = [
//         { type: 'New Event', content: 'You have been assigned to the "Community Cleanup" event.', timestamp: '09/14/2024 10:00 AM' },
//         { type: 'Reminder', content: 'Upcoming "Tree Planting" event on 09/20/2024.', timestamp: '09/14/2024 9:00 AM' },
//     ];

//     const notificationList = document.getElementById('notification-list');
//     notificationList.classList.add('list-group'); //Add bootstrap list group class

//     notifications.forEach(notification => {
//         const listItem = document.createElement('li');
//         listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start'); //Bootstrap classes

//         listItem.innerHTML = `
//             <div>
//                 <span class="badge badge-info mr-2">${notification.type}:</span>
//                 <span class="notification-content">${notification.content}</span>
//             </div>

//             <span class="notification-timestamp text-muted">${notification.timestamp}</span>
//         `;

//         notificationList.appendChild(listItem);
//     });
// });

import React from 'react'; 

const Notifications = () => {
    const notifications = [
        { type: 'New Event', content: 'You have been assigned to the "Community Cleanup" event.', timestamp: '09/14/2024 10:00 AM' },
        { type: 'Reminder', content: 'Upcoming "Tree Planting" event on 09/20/2024.', timestamp: '09/14/2024 9:00 AM' },
    ]; 

    return (
        <div className="container mt-5"> 
            <h2>Notifications</h2>
            <ul id="notification-list" className="list-group">
                {notifications.map((notification, index) => (
                    <li key={index} className="list-group-item d-flex justfiy-content-between align-items-start">
                        <div>
                            <span className="badge badge-info mr-2">{notification.type}</span>
                            <span className="notification-content">{notification.content}</span>
                        </div>

                        <span className="notification-timestamp text-muted">{notification.timestamp}</span>
                    </li>
                ))}
            </ul>
        </div>
    ); 
}; 

export default Notifications; 