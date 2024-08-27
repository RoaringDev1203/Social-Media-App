import api from '../../utils/api';

export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts'); // Ensure this URL is correct
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};
