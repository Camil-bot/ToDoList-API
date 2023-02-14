const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectID,
    required: true
  },
  solved: {
    type: Boolean,
    required: true
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
