const Task = require("../models/taskModel");
const { cloudinary } = require("../config");


exports.createTask = async (req, res) => {
  try {
    const { title, description, image, assignedto } = req.body;
    let imageUrl = "";

    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "task",
      });
      imageUrl = result.secure_url;
    }

    const task = await Task.create({
      title,
      description,
      image: imageUrl,
      assignedto,
      createdby: req.user._id,
    });

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdby: req.user._id }).populate(
      "assignedto",
      "name email"
    );

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};
