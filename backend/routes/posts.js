const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const path = require('path');
const fs = require('fs');
// const { addNotification } = require('./Notifications');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Create a post
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, body } = req.body;
  const image = req.file ? req.file.path : '';
  const io = req.app.get('io'); // Get the io instance

  try {
      const newPost = new Post({
          title,
          body,
          image: req.file ? `uploads/${req.file.filename}` : null,
          user: req.user.id // Attach the user ID to the post
      });

      const post = await newPost.save();

      console.log('post', post)
      // Emit the new post event
      io.emit('createPost', post);

      res.json(post);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username') // Populate the post user
      .populate('comments.user', 'username') // Populate the user in comments
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Update a post
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, body, image } = req.body;
  const io = req.app.get('io'); // Get the io instance
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title || post.title;
    post.body = body || post.body;
    post.image = image || post.image;
    await post.save();

    // Emit the post updated event
    io.emit('postUpdated', post);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const io = req.app.get('io'); // Get the io instance
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.findByIdAndDelete(id);

    // Emit the post deleted event
    io.emit('postDeleted', id);

    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Like a post
router.put('/:id/like', auth, async (req, res) => {
  const { id } = req.params;
  const io = req.app.get('io'); // Get the io instance
  try {
    const post = await Post.findById(id);
    // if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((like) => like.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();

    // Emit the post liked event
    io.emit('postLiked', { postId: id, userId: req.user.id });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Comment on a post
router.post('/:id/comment', auth, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const io = req.app.get('io'); // Get the io instance
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = {
      user: req.user.id,
      content
    };

    post.comments.push(newComment);
    await post.save();

    // Emit the comment added event
    io.emit('commentAdded', { postId: id, comment: newComment });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
