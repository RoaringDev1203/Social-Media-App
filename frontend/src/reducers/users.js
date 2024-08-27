// reducers/users.js
import { FETCH_USER, USER_ERROR } from '../actions/types';

const initialState = {
    users: {},
    loading: true,
    error: {}
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                users: { ...state.users, [action.payload._id]: action.payload },
                loading: false
            };
        case USER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default users;
