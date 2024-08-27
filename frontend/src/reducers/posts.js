import {
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    GET_POSTS,
    ADD_COMMENT,
    LIKE_POST,
    POST_ERROR
} from '../actions/types';
  
const initialState = {
    posts: [],
    loading: true,
    error: {}
};
  
const postsReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
        case CREATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
            };
        case EDIT_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            };
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload._id ? payload : post
                ),
                loading: false
            };
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === action.payload.id ? { ...post, likes: action.payload.likes } : post
                ),
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
};
  
export default postsReducer;
  