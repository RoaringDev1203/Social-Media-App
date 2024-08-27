import api from '../utils/api';
import { FOLLOW_USER, UNFOLLOW_USER, AUTH_ERROR } from './types';

export const followUser = userId => async dispatch => {
    try {
        const res = await api.put(`/follow/${userId}`);
        dispatch({ type: FOLLOW_USER, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

export const unfollowUser = userId => async dispatch => {
    try {
        const res = await api.put(`/unfollow/${userId}`);
        dispatch({ type: UNFOLLOW_USER, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};
