import api from '../utils/api';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token, localStorage.username);
    }

    try {
        const res = await api.get('/auth');
        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

export const register = ({ username, email, password, bio, profilePicture }, navigate) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ username, email, password });

    try {
        const res = await api.post('/auth/register', body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        console.log('Registration successful:', res.data);
        navigate('/login'); // Navigate to the Home page after successful registration
        // dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: REGISTER_FAIL });
    }
};

export const login = ({ email, password }, navigate) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ email, password });

    try {
        const res = await api.post('/auth/login', body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        console.log('Login successful:', res.data)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.result.username)
        setAuthToken(res.data.token, res.data.result.username); // Set the token for future requests
        dispatch(loadUser());
        navigate('/dashboard');
    } catch (err) {
        console.error('Login error:', err.res ? err.res.data : err.message);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: LOGIN_FAIL });
    }
};

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};
