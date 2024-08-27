const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.userId }).populate('fromUser', 'username').sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const addNotification = async (notificationData, io) => {
    try {
        const notification = new Notification(notificationData);
        await notification.save();

        // Emit the notification to all connected clients
        io.emit('receiveNotification', notification);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = { getNotifications, addNotification };
