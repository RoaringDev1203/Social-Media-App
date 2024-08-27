import api from './api';

const setAuthToken = (token, username) => {
    if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token); // Make sure token is saved in localStorage
        localStorage.setItem('username', username); // Make sure token is saved in localStorage
    } else {
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
};

export default setAuthToken;
