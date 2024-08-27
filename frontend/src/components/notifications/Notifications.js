import React, { useEffect, useState } from 'react';
import socket from '../posts/socket';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });
        // Listen for incoming notifications
        socket.on('createPost', (post) => {
            console.log('New post received:', post);
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                { type: 'createPost', message: `New post created: ${post.title}`, post }
            ]);
        });

        socket.on('postLiked', ({ postId, userId }) => {
            setNotifications((prevNotifications) => [
            ...prevNotifications,
            { type: 'likePost', message: `Post liked by user: ${userId}`, postId }
            ]);
        });

        socket.on('commentAdded', ({ postId, comment }) => {
            setNotifications((prevNotifications) => [
            ...prevNotifications,
            { type: 'newComment', message: `New comment on post: ${postId}`, comment }
            ]);
        });

        // Cleanup on unmount
        return () => {
            socket.off('createPost');
            socket.off('postLiked');
            socket.off('commentAdded');
        };
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
            {notifications.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
