const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");
const ObjectId = require("mongoose").Types.ObjectId;

router.use(require("../middleware/checksession"));

router.get("/", async (req, res) => {
  let tasks = await Task.find({ ownerID: req.body.verified.user_id }).catch(
    (err) => {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  );

  return res.status(200).json({ msg: "Ok", tasks: tasks });
});

router.post("/", (req, res) => {
  Task.create(
    {
      title: req.body.taskTitle,
      ownerID: req.body.verified.user_id,
      solved: false
    },
    (err) => {
      if (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
      }
      return res.status(200).json({ msg: "Ok" });
    }
  );
});

router.put("/", async (req, res) => {
  //aici nu stiu exact //2check acasa

  let updated = await Task.findOneAndUpdate(
    { _id: new ObjectId(req.body.taskID) },
    { title: req.body.newTitle, solved: req.body.isSolved }
  ).catch((err) => {
    return res.status(500).json({ msg: "Internal Server Error" });
  });
  if (!updated) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
  return res.status(200).json({ msg: "Ok" });
});

router.patch("/", async (req, res) => {
  let updated = await Task.findOneAndUpdate(
    { _id: new ObjectId(req.body.taskID) },
    { solved: req.body.solved }
  ).catch((err) => {
    return res.status(500).json({ msg: "Internal Server Error" });
  });
  if (!updated) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
  return res.status(200).json({ msg: "Ok" });
});

router.delete("/", async (req, res) => {
  console.log("intra");
  let deleted = await Task.deleteOne({
    _id: new ObjectId(req.body.taskID)
  }).catch((err) => {
    return res.status(500).json({ error: "Internal Server Error" });
  });
  if (!deleted) {
    res.status(500).json({ msg: "Internal Server Error" });
  } else {
    res.status(200).json({ msg: "Ok" });
  }
});

module.exports = router;
