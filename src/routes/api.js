// dependencies
const express = require("express");
const connect = require("connect-ensure-login");
const multer = require("multer");

// models
const Story = require("../models/story");
const Comment = require("../models/comment");
const User = require("../models/user");
const Paper = require("../models/paper");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("file");
    // console.log(file.originalname);
    cb(null, path.resolve(__dirname, "public"));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

// var upload = multer({
//   storage: storage,
//   onError: function(err, next) {
//     console.log("error", err);
//     next(err);
//   }
// });

// var upload = multer({ dest: "public/uploads" });

// api endpoints
router.get("/whoami", function(req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send({});
  }
});

router.get("/user", function(req, res) {
  User.findOne({ id: req.query._id }, function(err, user) {
    console.log(user);
    res.send(user);
  });
});

router.get("/stories", function(req, res) {
  Story.find({}, function(err, stories) {
    res.send(stories);
  });
});

router.post("/story", connect.ensureLoggedIn(), function(req, res) {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content
  });

  newStory.save(function(err, story) {
    // configure socketio

    User.findOne({ id: req.query._id }, function(err, user) {
      user.last_post = req.body.content;
      user.save();
    });

    if (err) console.log(err);
  });

  res.send({});
});

router.get("/comment", function(req, res) {
  Comment.find({ parent: req.query.parent }, function(err, comments) {
    res.send(comments);
  });
});
router.get("/mypaper", function(req, res) {
  Paper.find({ parent: req.query.parent }, function(err, papers) {
    res.send(papers);
  });
});

router.post("/comment", connect.ensureLoggedIn(), function(req, res) {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content
  });

  newComment.save(function(err, comment) {
    if (err) console.log(err);
  });

  res.send({ hi: "hi" });
});

// router.post(
//   "/test",
//   function() {
//     console.log("middle");
//   },
//   function(req, res, next) {
//     console.log("hello");
//   }
// );

router.post(
  "/uploadFile",
  () => {
    console.log("middle");
    upload.single("file");
    console.log("done");
  },
  function(req, res, next) {
    console.log("no problem");
    // if (req.file == undefined) {
    //   return res
    //     .status(422)
    //     .send({ error: "You must select a file to upload." });
    // }
    // //console.log(req.body.author)
    // const product = new FileDetail({
    //   _id: new mongoose.Types.ObjectId(),
    //   // uploader: req.body.uploader,
    //   // uploader: "Ajay",
    //   filePath: req.file.path,
    //   fileName: req.file.originalname,
    //   author: req.body.author,
    //   abstract: req.body.abstract,
    //   subject: req.body.subject
    // });
    // product
    //   .save()
    //   .then(result => {
    //     FileDetail.find({}).exec(function(err, files) {
    //       if (files) {
    //         res.status(201).json({
    //           message: "File uploaded successfully",
    //           allFilesDetail: files
    //         });
    //       } else {
    //         res.status(204).json({
    //           message: "No file detail exist",
    //           allFilesDetail: files
    //         });
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //       error: err
    //     });
    //   });
  }
);
module.exports = router;
