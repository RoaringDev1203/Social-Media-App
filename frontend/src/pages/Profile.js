import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../actions/profile'; // Implement these actions

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);
    const [formData, setFormData] = useState({ username: '', email: '', bio: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            dispatch(getProfile(user._id));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (profile) {
            setFormData({ username: profile.username, email: profile.email, bio: profile.bio });
        }
    }, [profile]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(updateProfile(user._id, formData, navigate));
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <div>
                    <h2>Username: {user.username}</h2>
                    <h3>Email: {user.email}</h3>
                    <p>Bio: {user.bio}</p>
                </div>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        placeholder="Email"
                    />
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={onChange}
                        placeholder="Bio"
                    ></textarea>
                    <button type="submit">Update Profile</button>
                </form>
            )}
        </div>
    );
};

export default Profile;
