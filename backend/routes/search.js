const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();

// Search users and posts
router.get('/', async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({ username: { $regex: query, $options: 'i' } });
    const posts = await Post.find({ content: { $regex: query, $options: 'i' } }).populate('user', 'username');
    res.status(200).json({ users, posts });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
