document.addEventListener('DOMContentLoaded', () => {
    const notifications = [
        { type: 'New Event', content: 'You have been assigned to the "Community Cleanup" event.', timestamp: '09/14/2024 10:00 AM' },
        { type: 'Reminder', content: 'Upcoming "Tree Planting" event on 09/20/2024.', timestamp: '09/14/2024 9:00 AM' },
    ];

    const notificationList = document.getElementById('notification-list');

    notifications.forEach(notification => {
        const listItem = document.createElement('li');
        listItem.classList.add('notification-item');

        listItem.innerHTML = `
            <span class="notification-type">${notification.type}:</span>
            <span class="notification-content">${notification.content}</span>
            <span class="notification-timestamp">${notification.timestamp}</span>
        `;

        notificationList.appendChild(listItem);
    });
});
