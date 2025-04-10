// server/routes/taskRoutes.js
const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// GET tasks for logged-in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// POST new task for logged-in user
router.post("/", auth, async (req, res) => {
  const { title } = req.body;
  const newTask = new Task({ title, completed: false, userId: req.userId });
  await newTask.save();
  res.status(201).json(newTask);
});

// DELETE task by ID
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Task deleted" });
});

module.exports = router;
