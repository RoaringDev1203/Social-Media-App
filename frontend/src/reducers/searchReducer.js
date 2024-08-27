const searchReducer = (state = { results: { users: [], posts: [] } }, action) => {
    switch (action.type) {
        case 'SEARCH':
            return { ...state, results: action.payload };
        default:
            return state;
    }
};

export default searchReducer;
  