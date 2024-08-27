import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editPost } from '../../actions/posts'; // Add this action to handle post editing

const EditPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get post ID from URL
    const post = useSelector(state => 
        state.posts.posts.find(p => p._id === id)
    );

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        image: ''
    });

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                body: post.body,
                image: post.image || ''
            });
        }
    }, [post]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(editPost(id, formData, navigate)); // Create this action
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={onSubmit}>
                <input
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={onChange}
                />
                <textarea
                placeholder="Body"
                name="body"
                value={formData.body}
                onChange={onChange}
                />
                <input
                type="text"
                placeholder="Image URL"
                name="image"
                value={formData.image}
                onChange={onChange}
                />
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
