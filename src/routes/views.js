// dependencies
const express = require("express");
const router = express.Router();
const path = require("path");

// public endpoints
router.get("/feed", function(req, res, next) {
  res.sendFile("index.html", { root: "src/views" });
});
router.get("/", function(req, res, next) {
  res.sendFile("home.html", { root: "src/views" });
});

router.get("/u/profile", function(req, res) {
  res.sendFile("profile.html", { root: "src/views" });
});

router.get("/paper/", function(req, res) {
  res.sendFile("paper.html", { root: "src/views" });
});
router.get("/pdf/myproifle.pdf", function(req, res) {
  res.sendFile("myprofile.pdf", { root: "src/pdf" });
});

// router.get("/uploadform", function(req, res) {
//   res.sendFile("upload.html", { root: "src/views" });
// });
router.get("/download", function(req, res) {
  // res.sendFile("upload.html", { root: "src/views" });
  res.download(path.join(__dirname, "myprofile.pdf"), function(err) {
    console.log(err);
  });
});

module.exports = router;
