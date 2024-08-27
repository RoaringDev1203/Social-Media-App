import api from '../utils/api';
import { setAlert } from './alert';
import { CREATE_POST, GET_POSTS, EDIT_POST, DELETE_POST, ADD_COMMENT, POST_ERROR, LIKE_POST } from './types';

export const createPost = (formData, navigate) => async (dispatch) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    try {
        const res = await api.post('/posts', formData, config);
        console.log('Create Post Response:', res); // Log response
        dispatch({ type: CREATE_POST, payload: res.data });
        dispatch(setAlert('Post Created', 'success'));
        navigate('/posts');
    } catch (err) {
        console.error('Error creating post:', err); // Log error
        const errorMsg = err.response ? err.response.statusText : 'Server Error';
        const errorStatus = err.response ? err.response.status : 500;
        dispatch({ type: POST_ERROR, payload: { msg: errorMsg, status: errorStatus } });
        dispatch(setAlert(errorMsg, 'danger'));
    }
};

export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.get('/posts');
        console.log('Get Posts Response:', res.data); // Log response
        dispatch({ type: GET_POSTS, payload: res.data });
    } catch (err) {
        console.error('Error fetching posts:', err); // Log error
        const errorMsg = err.response ? err.response.statusText : 'Server Error';
        const errorStatus = err.response ? err.response.status : 500;
        dispatch({ type: POST_ERROR, payload: { msg: errorMsg, status: errorStatus } });
        dispatch(setAlert(errorMsg, 'danger'));
    }
};

export const editPost = (id, formData, navigate) => async (dispatch) => {
    try {
        const res = await api.put(`/posts/${id}`, formData);
        dispatch({ type: EDIT_POST, payload: res.data });
        navigate('/posts');
    } catch (err) {
        console.error('Error in editPost action:', err);
        const errorMsg = err.response ? err.response.data.message || err.response.statusText : 'Server Error';
        const errorStatus = err.response ? err.response.status : 500;
        dispatch({ type: POST_ERROR, payload: { msg: errorMsg, status: errorStatus } });
    }
};

export const deletePost = (id, navigate) => async (dispatch) => {
    try {
        await api.delete(`/posts/${id}`);
        dispatch({ type: DELETE_POST, payload: id });
        navigate('/posts');
    } catch (err) {
        const errorMsg = err.response ? err.response.statusText : 'Server Error';
        const errorStatus = err.response ? err.response.status : 500;
        dispatch({ type: POST_ERROR, payload: { msg: errorMsg, status: errorStatus } });
    }
};

export const addComment = (postId, formData) => async (dispatch) => {
    try {
        const res = await api.post(`/posts/${postId}/comment`, formData);
        console.log("Comment Successfully: ", res.data)
        dispatch({ type: ADD_COMMENT, payload: res.data });
    } catch (err) {
        const errorMsg = err.response ? err.response.statusText : 'Server Error';
        const errorStatus = err.response ? err.response.status : 500;
        dispatch({ type: POST_ERROR, payload: { msg: errorMsg, status: errorStatus } });
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const res = await api.put(`/posts/${id}/like`);
        dispatch({ type: LIKE_POST, payload: { id, likes: res.data.likes } });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
