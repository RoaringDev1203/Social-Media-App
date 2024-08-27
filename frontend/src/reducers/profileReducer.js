const profileReducer = (state = { profile: null }, action) => {
    switch (action.type) {
        case 'GET_PROFILE':
            return { ...state, profile: action.payload };
        case 'FOLLOW_USER':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    followers: state.profile.followers.includes(action.payload.userId)
                    ? state.profile.followers.filter((follower) => follower !== action.payload.userId)
                    : [...state.profile.followers, action.payload.userId]
                }
            };
        default:
            return state;
    }
};

export default profileReducer;
  