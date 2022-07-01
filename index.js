const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./Task");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mtzq1.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, () => {
  console.log("DB connected");
});

console.log(uri);

app.get("/", (req, res) => {
  res.send(`quick todo runnig on port ${port}`);
});

app.post("/add-task", (req, res) => {
  const taskData = {
    email: req.query.email,
    user_id: req.query.uid,
    task: req.body.task,
    task_status: req.body.status,
  };
  // console.log(taskData);
  const run = async () => {
    try {
      const data = await Task.create(taskData);
      res.send(data);
    } catch (e) {
      e;
    }
  };
  run();
});

app.get("/tasks-list", (req, res) => {
  const { email, uid } = req.query;
  const run = async () => {
    try {
      const taskList = await Task.where("email")
        .equals(email)
        .where("user_id")
        .equals(uid);
      res.send(taskList);
    } catch (e) {
      e;
    }
  };
  run();
});

app.get("/update-status", (req, res) => {
  const { id } = req.query;
  const run = async () => {
    try {
      const task = await Task.findById(id);
      task.task_status = "done";
      await task.save();
      res.send(task);
    } catch (e) {
      e;
    }
  };
  run();
});

app.get("/delete-task", (req, res) => {
  const { id } = req.query;
  const run = async () => {
    try {
      const task = await Task.findByIdAndDelete(id);
      res.send(task);
    } catch (e) {
      e;
    }
  };
  run();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
