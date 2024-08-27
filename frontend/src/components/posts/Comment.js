import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../actions/posts'; // Add this action to handle commenting

const CommentForm = ({ postId }) => {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addComment(postId, { content })); // Create this action
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Add a comment"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button type="submit">Comment</button>
        </form>
    );
};

export default CommentForm;
