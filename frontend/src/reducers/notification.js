import { GET_NOTIFICATIONS, NOTIFICATION_ERROR } from '../actions/types';

const initialState = {
    notifications: [],
    loading: true,
    error: {}
};

const notification = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload,
                loading: false
            };
        case NOTIFICATION_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

export default notification;
