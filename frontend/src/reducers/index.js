import { combineReducers } from 'redux';
import auth from './auth';
import posts from './posts';
import notification from './notification';
import alert from './alert';
import profileReducer from './profileReducer';
import searchReducer from './searchReducer';

export default combineReducers({
    auth,
    posts,
    notification,
    alert,
    profileReducer,
    searchReducer
});
