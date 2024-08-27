import axios from 'axios';

export const search = (query) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/search?query=${query}`);
        dispatch({ type: 'SEARCH', payload: data });
    } catch (error) {
        console.log(error);
    }
};
