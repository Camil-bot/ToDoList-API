const ActiveSession = require("../models/activeSessions");
const jwt = require("jsonwebtoken");

const checkSession = async (req, res, next) => {
  console.log(req.headers.authorization);
  let session = await ActiveSession.findOne({
    token: req.headers.authorization
  }).catch((err) => {
    return res.status(500).json({ msg: "Server error" });
  });
  if (session && session.active) {
    jwt.verify(session.token, process.env.JWT_SECRET_key, (err, rez) => {
      if (err) {
        return res.status(403).json({ msg: "Unauthorized" });
      }
      req.body.verified = rez;
      req.body.token = session.token;
    });
  } else {
    return res.status(403).json({ msg: "Unauthorized" });
  }

  next();
};

module.exports = checkSession;
