// dependencies
const express = require("express");
const router = express.Router();
const path = require("path");
// public endpoints
router.get("/feed", function(req, res, next) {
  res.sendFile("community.html", { root: "src/views" });
  // res.sendFile("pdf.html", { root: "src/views" });
});

router.get("/newest_paper", function(req, res, next) {
  res.sendFile("home.html", { root: "src/views" });
});

router.get("/login", function(req, res) {
  res.redirect("/auth/google");
});

router.get("/", function(req, res, next) {
  res.sendFile("index3.html", { root: "src/views" });
  // res.sendFile("home.html", { root: "src/views" });
});

router.get("/u/profile", function(req, res) {
  // res.sendFile("profile.html", { root: "src/views" });
  res.sendFile("profile0.html", { root: "src/views" });
});

router.get("/paper/", function(req, res) {
  res.sendFile("paper.html", { root: "src/views" });
});

// router.get("/uploadform", function(req, res) {
//   res.sendFile("upload.html", { root: "src/views" });
// });
router.get("/download/:fileName", function(req, res) {
  console.log("download");
  Paper.findOneAndUpdate(
    { fileName: req.query.fileName },
    { $inc: { downloads: 1 } },
    function(paper) {
      console.log("download update");
    }
  );
  res.download(__dirname + "/../../public/pdf/" + req.params.fileName);
});

// router.get("/viewpaper", function(req, res) {
//   // res.sendFile("upload.html", { root: "src/views" });
//   Paper.findOneAndUpdate(
//     { fileName: req.query.fileName },
//     { $inc: { views: 1 } },
//     function(paper) {
//       console.log("view update");
//     }
//   );
//   res.redirect("/static/pdf/" + req.query.fileName);
// });

module.exports = router;
