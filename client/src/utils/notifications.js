// src/utils/notifications.js
export const notifyUser  = (message) => {
    if (Notification.permission === 'granted') {
        new Notification('Sync Notification', { body: message });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification('Sync Notification', { body: message });
            }
        });
    }
};  