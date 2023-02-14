const express = require("express");
const router = express.Router();
const User = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

router.use(require("../middleware/checksession"));

router.get("/", async (req, res) => {
  let userInfo = await User.findOne({ _id: req.body.verified.user_id }).catch(
    (err) => {
      return res.status(200).json({ msg: "Internal Server Error" });
    }
  );

  return res.status(200).json({ msg: "Ok", userInfo: userInfo });
});

module.exports = router;
