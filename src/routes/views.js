// dependencies
const express = require("express");
const router = express.Router();

// public endpoints
router.get("/", function(req, res, next) {
  res.sendFile("index.html", { root: "src/views" });
});

router.get("/u/profile", function(req, res) {
  res.sendFile("profile.html", { root: "src/views" });
});

router.get("/paper", function(req, res) {
  res.sendFile("paper.html", { root: "src/views" });
});
router.get("/pdf/myprofile.pdf", function(req, res) {
  res.sendFile("myprofile.pdf", { root: "src/pdf" });
});

module.exports = router;
