const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  task_status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
