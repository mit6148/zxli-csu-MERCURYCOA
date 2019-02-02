// dependencies
const express = require("express");
const connect = require("connect-ensure-login");
const multer = require("multer");
const mongoose = require("mongoose");
// models
const Story = require("../models/story");
const Comment = require("../models/comment");
const User = require("../models/user");
const Paper = require("../models/paper");
const CommentPaper = require("../models/commentpaper");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();
const path = require("path");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("file");
    cb(null, path.resolve(__dirname, "../../public/pdf"));
  },
  filename: function(req, file, cb) {
    // cb(null, file.originalname + "-" + Date.now() + ".pdf");
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname.replace(/(?!\.[^.]+$)\.|[^\w.]+/g, "")
    );
  }
  // filename: function(req, file, cb) {
  //   cb(null, file.originalname);
  // }
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

router.get("/onepaper", function(req, res) {
  console.log(req.query.fileName);
  Paper.findOne({ fileName: req.query.fileName }, function(err, paper) {
    if (paper) {
      res.send(paper);
    } else {
      CommentPaper.findOne({ fileName: req.query.fileName }, function(
        err,
        paper
      ) {
        res.send(paper);
      });
    }
  });
});

router.get("/success", function(req, res) {
  res.sendFile("success.html", { root: "src/views" });
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

router.get("/user_papers", function(req, res) {
  console.log(req.query.user_id);
  Paper.find({ user: new ObjectId(req.query.user_id) }, function(err, papers) {
    console.log(papers);
    console.log("ddddd");
    console.log(err);
    res.send(papers);
  });
});

router.get("/user_comments", function(req, res) {
  CommentPaper.find({ user: new ObjectId(req.query.user_id) }, function(
    err,
    papers
  ) {
    console.log("i want papers");
    res.send(papers);
  });
});
// SampleModel.find( { dates : { $elemMatch: {  date : { $gte: 'DATE_VALUE' } } } } )
//SampleModel.find( { 'dates.date': { $gte: 'DATE_VALUE' } } )

// router.get("/mypaper", function(req, res) {
//   Paper.find({ parent: req.query.parent }, function(err, papers) {
//     res.send(papers);
//   });
// });

router.get("/allpaper", function(req, res) {
  Paper.find({}, function(err, papers) {
    res.send(papers);
  });
});

router.get("/toppaper", function(req, res) {
  Paper.find({ views: { $exists: true } })
    .sort({ views: 1 })
    .limit(10)
    .exec(function(err, papers) {
      res.send(papers);
      console.log(papers);
      console.log("top papers");
    });
});

router.get("/cate/:subject", function(req, res) {
  Paper.find({ subject: req.params.subject }, function(err, papers) {
    res.send(papers);
  });
});

router.get("/paper/:_id", (req, res) => {
  // router.get("/paper/:fileName", (req, res) => {
  const errors = {};
  // Paper.findOne({ fileName: req.params.fileName })
  Paper.findOne({ id: req.query._id })
    // .populate("user")
    .then(paper => {
      if (!paper) {
        errors = "There is no paper for this user";
        res.status(404).json(errors);
      }

      //res.json(paper);
      res.sendFile("paper.html", { root: "src/views" });
      // console.log(paper.user.name);
    })
    .catch(err =>
      res.status(404).json({ paper: "There is no profile for this user" })
    );
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

// router.post("/likes", function(req, res) {
//   Paper.findOneAndUpdate(
//     { fileName: req.body.fileName },
//     { $inc: { likes: 1 } },
//     function(err, paper) {
//       console.log(paper.likes);
//     }
//   );
// });

// router.post(
//   "/test",
//   function() {
//     console.log("middle");
//   },
//   function(req, res, next) {
//     console.log("hello");
//   }
// );

router.get("/paper_length", function(req, res) {
  // res.send("testign");
  Paper.find({}, function(err, papers) {
    console.log("hello");
    console.log(papers);
    res.send({ length: papers.length });
  });
});

router.get("/views", function(req, res) {
  //update model fields
  Paper.findOneAndUpdate({}, function(err, papers) {
    res.send(papers);
  });
});
router.get("/upload_paper_form", connect.ensureLoggedIn(), function(req, res) {
  res.sendFile("upload_paper.html", { root: "src/views" });
});

router.get("/upload_version_form/:fileName", connect.ensureLoggedIn(), function(
  req,
  res
) {
  res.sendFile("upload_version.html", { root: "src/views" });
});

router.get("/upload_comment_form/:fileName", connect.ensureLoggedIn(), function(
  req,
  res
) {
  res.sendFile("upload_comment.html", { root: "src/views" });
});
router.get("/pdf_embed", connect.ensureLoggedIn(), function(req, res) {
  res.sendFile("pdf.html", { root: "src/views" });
});

router.get("/viewpaper", function(req, res) {
  Paper.findOneAndUpdate(
    { fileName: req.query.fileName },
    { $inc: { views: 1 } },
    function() {
      console.log("paper view update");
    }
  );
  CommentPaper.findOneAndUpdate(
    { fileName: req.query.fileName },
    { $inc: { views: 1 } },
    function() {
      console.log("comment view update");
    }
  );

  res.redirect("/static/pdf/" + req.query.fileName);
});

router.post("/likes/:fileName", function(req, res) {
  Paper.findOneAndUpdate(
    { fileName: req.query.fileName },
    { $inc: { likes: 1 } },
    function() {
      console.log("likes update");
    }
  );
  res.redirect("/static/pdf/" + req.query.fileName);
});

router.get("/downloadpaper", function(req, res) {
  // res.sendFile("upload.html", { root: "src/views" });
  Paper.findOneAndUpdate(
    { fileName: req.query.fileName },
    { $inc: { downloads: 1 } },
    function(paper) {
      console.log("paper download update");
    }
  );
  CommentPaper.findOneAndUpdate(
    { fileName: req.query.fileName },
    { $inc: { downloads: 1 } },
    function(paper) {
      console.log("comment download update");
    }
  );
  res.download("./public/pdf/" + req.query.fileName);
  // res.redirect("/static/pdf/" + req.query.fileName);
});

router.post(
  "/uploadPaper",
  connect.ensureLoggedIn(),
  upload.single("photo"),
  function(req, res, next) {
    console.log("no problem");
    console.log("file data", req.file);
    if (req.file == undefined) {
      res.redirect("/api/upload_paper_form");
    }
    // Paper.find({}, function(err, papers) {
    Paper.find({}, function(err, paper) {
      let paper_num = 0;

      for (p of paper) {
        if (p.paper_root_parent == p.fileName) {
          paper_num++;
        }
      }

      const product = new Paper({
        filePath: req.file.path,
        fileName: req.file.filename,
        user: req.user._id,
        title: req.body.title,
        author: req.body.author,
        abstract: req.body.abstract,
        method: req.body.method,
        keywords: req.body.keywords,
        subject: req.body.subject,
        paper_parent: req.file.filename,
        paper_root_parent: req.file.filename,
        paperName: req.file.originalname,

        papernumber: `P - ${paper_num + 1} - V1`
      });
      product
        .save()
        .then(result => {
          console.log("save");
          Paper.find({}).exec(function(err, files) {
            if (files) {
              Paper.findOneAndUpdate(
                { fileName: product.fileName },
                { $push: { versions: product } },
                { new: true }
              ).then(function(paper) {
                console.log(product.fileName);
              });
              // res.redirect("/api/upload_paper_form");
              //
              res.redirect("/u/profile?" + product.user);
              // res.redirect("/api/success");
            } else {
              // res.status(204).json({
              //   message: "No file detail exist",
              //   allFilesDetail: files
              // });
              res.redirect("/api/upload_paper_form");
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });
    // });
  }
);

router.post(
  "/uploadCommentPaper",
  connect.ensureLoggedIn(),
  upload.single("photo"),
  function(req, res, next) {
    if (req.file == undefined) {
      return res
        .status(422)
        .send({ error: "You must select a file to upload." });
    }
    Paper.findOne({ fileName: req.body.paper_parent }, function(
      err,
      parentPaper
    ) {
      console.log(parentPaper);
      let prev_comment_num = parentPaper.comments.length;
      let comment_num = parentPaper.papernumber.split("-");
      comment_num[0] = "C";
      comment_num[3] = parseInt(prev_comment_num) + 1;
      comment_num = comment_num.join("-");
      console.log(comment_num);

      const newComment = new CommentPaper({
        filePath: req.file.path,
        fileName: req.file.filename,
        user: req.user._id,
        title: req.body.title,
        author: req.body.author,
        paper_parent: req.body.paper_parent,
        abstract: req.body.abstract,
        subject: req.body.subject,
        method: req.body.method,
        keywords: req.body.keywords,
        paper_parent: req.body.paper_parent,
        papernumber: comment_num
      });
      newComment
        .save()
        .then(result => {
          console.log("save");
          CommentPaper.find({}).exec(function(err, files) {
            if (files) {
              // res.redirect("/api/upload_comment_form/" + req.body.paper_parent);
              res.redirect("/api/paper/" + newComment.paper_parent);

              Paper.findOneAndUpdate(
                { fileName: req.body.paper_parent },
                { $push: { comments: newComment } },
                { new: true }
              ).then(function(paper) {});
            } else {
              res.status(204).json({
                message: "No file detail exist",
                allFilesDetail: files
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });
  }
);

router.post(
  "/uploadNewVersion",
  connect.ensureLoggedIn(),
  upload.single("photo"),
  function(req, res, next) {
    console.log("no problem");
    console.log("file data", req.file);
    if (req.file == undefined) {
      return res
        .status(422)
        .send({ error: "You must select a file to upload." });
    }
    Paper.findOne({ fileName: req.body.paper_parent }, function(
      err,
      parentPaper
    ) {
      console.log(parentPaper);
      let version_num = parentPaper.papernumber.split("V");
      version_num[1] = parseInt(version_num[1]) + 1;
      version_num = version_num.join("V");
      console.log(version_num);
      const newPaper = new Paper({
        filePath: req.file.path,
        fileName: req.file.filename,
        user: req.user._id,
        title: req.body.title,
        author: req.body.author,
        abstract: req.body.abstract,
        subject: req.body.subject,
        method: req.body.method,
        keywords: req.body.keywords,

        papernumber: version_num,

        paper_parent: req.body.paper_parent,
        paper_root_parent: parentPaper.paper_root_parent
      });
      newPaper
        .save()
        .then(result => {
          console.log("save");
          Paper.find({}).exec(function(err, files) {
            if (files) {
              // res.redirect("/api/upload_version_form/" + req.body.paper_parent);
              res.redirect("/u/profile?" + newPaper.user);

              Paper.findOneAndUpdate(
                { fileName: parentPaper.paper_root_parent },
                { $push: { versions: newPaper } },
                { new: true }
              ).then(function(paper) {});
            } else {
              res.status(204).json({
                message: "No file detail exist",
                allFilesDetail: files
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });
  }
);

// router.post("/uploadFile", upload.single("photo"), function(req, res, next) {
//   if (req.file == undefined) {
//     return res.status(422).send({ error: "You must select a file to upload." });
//   }
//   Paper.find({}, function(err, papers) {
//     const product = new Paper({
//       _id: new mongoose.Types.ObjectId(),
//       filePath: req.file.path,
//       // fileName: req.file.originalname,
//       fileName: req.file.filename,
//       // fileName: req.body.title + "-" + Date.now() + ".pdf",
//       title: req.body.title,
//       author: req.body.author,
//       abstract: req.body.abstract,
//       subject: req.body.subject,
//       type: req.body.type,
//       user_parent: req.body.user_parent,
//       paper_parent: req.body.parent_parent

//       // papernumber: `P-${num_papers + 1}`
//       // papernumber: {
//       //   type: paper ? `P-${num_papers + 1}` : `C-${num_papers + 1}`
//       // }
//     });
//     product
//       .save()
//       .then(result => {
//         Paper.find({}).exec(function(err, files) {
//           if (files) {
//             res.status(201).json({
//               message: "File uploaded successfully",
//               allFilesDetail: files
//             });
//           } else {
//             res.status(204).json({
//               message: "No file detail exist",
//               allFilesDetail: files
//             });
//           }
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   });
// });
module.exports = router;
