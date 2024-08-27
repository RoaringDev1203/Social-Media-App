import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { fetchPosts } from './api';
import CommentForm from './Comment';

const Posts = () => {
    const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial posts
    const loadPosts = async () => {
      try {
        const initialPosts = await fetchPosts();
        setPosts(initialPosts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setLoading(false);
      }
    };

    loadPosts();

    // // WebSocket listeners
    // socket.on('createPost', (post) => {
    //   setPosts((prevPosts) => [post, ...prevPosts]); // Add new post to the list
    // });

    // Clean up WebSocket connection on component unmount
    // return () => {
    //   socket.off('createPost');
    // };
  }, []);

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`); // Navigate to the edit post page
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`posts/${postId}`);
        setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId)); // Remove post from the state
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await api.put(`posts/${postId}/like`);
      setPosts((prevPosts) => prevPosts.map(post => 
        post._id === postId ? response.data : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={() => navigate('/create-post')}>Create New Post</button> {/* Button to create new post */}
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              {post.image && <img src={`/${post.image}`} alt={post.title} />}
              <p>This post was posted by {post.user.username}</p>
              <button onClick={() => handleEdit(post._id)}>Edit</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
              <button onClick={() => handleLike(post._id)}>Like ({post.likes.length})</button> {/* Like button */}
              <CommentForm postId={post._id} /> {/* Add the CommentForm component */}

              {/* Render comments */}
              {post.comments && post.comments.length > 0 && (
                <div>
                  <h3>Comments:</h3>
                  <ul>
                    {post.comments.map(comment => (
                      <li key={comment._id}>
                        <p><strong>{comment.user.username}:</strong> {comment.content}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
