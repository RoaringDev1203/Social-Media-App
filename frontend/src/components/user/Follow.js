import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/follow'; // Implement these actions

const FollowButton = ({ userId }) => {
    const dispatch = useDispatch();
    const following = useSelector(state => state.auth.user.following);

    const isFollowing = following.includes(userId);

    const handleFollow = () => {
        if (isFollowing) {
            dispatch(unfollowUser(userId));
        } else {
            dispatch(followUser(userId));
        }
    };

    return (
        <button onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default FollowButton;
