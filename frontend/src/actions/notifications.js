import api from '../utils/api';
import { GET_NOTIFICATIONS, NOTIFICATION_ERROR } from './types';

// Action to get notifications
export const getNotifications = () => async (dispatch) => {
    try {
        const res = await api.get('/notifications');
        dispatch({
            type: GET_NOTIFICATIONS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: NOTIFICATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};
