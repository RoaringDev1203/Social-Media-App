const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
    const { username, email, bio } = req.body;

    const profileFields = {};
    if (username) profileFields.username = username;
    if (email) profileFields.email = email;
    if (bio) profileFields.bio = bio;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: profileFields }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
