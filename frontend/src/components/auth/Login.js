import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ history }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(login({ email, password }, navigate, history));
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
