const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Follow a user
router.put('/follow/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const userToFollow = await User.findById(req.params.id);

        if (!user.following.includes(req.params.id)) {
            user.following.push(req.params.id);
            userToFollow.followers.push(req.userId);

            await user.save();
            await userToFollow.save();
        }

        res.json({ following: user.following });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Unfollow a user
router.put('/unfollow/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const userToUnfollow = await User.findById(req.params.id);

        if (user.following.includes(req.params.id)) {
            user.following = user.following.filter(followingId => followingId.toString() !== req.params.id);
            userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId.toString() !== req.userId);

            await user.save();
            await userToUnfollow.save();
        }

        res.json({ following: user.following });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
