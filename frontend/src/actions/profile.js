import api from '../utils/api';
import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR } from './types';

export const getProfile = userId => async dispatch => {
    try {
        const res = await api.get(`/profile/${userId}`);
        dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

export const updateProfile = (userId, formData, navigate) => async dispatch => {
    try {
        const res = await api.put(`/profile/${userId}`, formData);
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
        navigate('/dashboard')
        console.log("Your profile was successfully updated!: ", res.data)
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};
