import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const Register = ({ history }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', password2: '' });
    const { username, email, password, password2 } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
        } else {
            dispatch(register({ username, email, password }, navigate, history));
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
