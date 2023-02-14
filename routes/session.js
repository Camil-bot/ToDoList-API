const express = require("express");
const router = express.Router();
const activeSession = require("../models/activeSessions");

router.use(require("../middleware/checksession"));

router.patch("/", async (req, res) => {
  console.log(req.body.verified.user_id);
  let logout = await activeSession
    .findOneAndUpdate(
      { user: req.body.verified.user_id, token: req.body.token },
      { active: false }
    )
    .catch((err) => {
      return res.status(500).json({ msg: "Internal Server Error" });
    });
  return res.status(200).json({ msg: "OK" });
});

module.exports = router;
