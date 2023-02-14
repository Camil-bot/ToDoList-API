const mongoose = require("mongoose");

const ActiveSessionsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const ActiveSession = new mongoose.model("ActiveSession", ActiveSessionsSchema);
module.exports = ActiveSession;
