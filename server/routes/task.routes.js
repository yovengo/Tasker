const express = require('express');
const auth = require('../middleware/auth.middleware');
const Task = require('../models/Task');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Task.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred on the server. Try later' });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newTask = await Task.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newTask);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred on the server. Try later' });
    }
  });

router
  .route(':taskId')
  .delete(auth, async (req, res) => {
    try {
      const { taskId } = req.params;
      const removedTask = await Task.findById(taskId);

      if (removedTask.userId.toString() === req.user._id) {
        await removedTask.remove();
        return res.send(null);
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred on the server. Try later' });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      if (task.userId.toString() === req.user._id) {
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        return res.send(updatedTask);
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred on the server. Try later' });
    }
  });

module.exports = router;
