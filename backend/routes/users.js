const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Follow a user
router.put('/:id/follow', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.followers.includes(req.userId)) {
      user.followers = user.followers.filter((follower) => follower.toString() !== req.userId);
      await user.save();
      res.status(200).json({ message: 'Unfollowed user' });
    } else {
      user.followers.push(req.userId);
      await user.save();
      res.status(200).json({ message: 'Followed user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
