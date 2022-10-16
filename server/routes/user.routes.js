const express = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId);
    res.status(200).send(currentUser);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred on the server. Try later' });
  }
});

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred on the server. Try later' });
  }
});

module.exports = router;
