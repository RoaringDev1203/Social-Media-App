import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ history }) => {
    const [formData, setFormData] = useState({ title: '', body: '', image: null });
    const { title, body, image } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = e => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('title', title);
        postData.append('body', body);
        if (image) {
            postData.append('image', image);
        }
        dispatch(createPost(postData, navigate));
    };

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    required
                />
                <textarea
                    placeholder="Body"
                    name="body"
                    value={body}
                    onChange={onChange}
                    required
                />
                <input
                    type="file"
                    name="image"
                    onChange={onChange}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
