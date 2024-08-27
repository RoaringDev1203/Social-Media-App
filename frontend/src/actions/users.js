import axios from 'axios';
import { FETCH_USER, USER_ERROR } from './types';

export const fetchUser = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/users/${userId}`);
        dispatch({ type: FETCH_USER, payload: res.data });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
