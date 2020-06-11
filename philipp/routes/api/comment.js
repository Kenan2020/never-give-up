const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const checkObjectId = require("../../middleware/checkObjectId");
const User = require("../../models/User");

const Comment = require("../../models/Comment");

//@route  POST api/comment/
//@desc  post a Comment
//@access  private

router.post(
  "/",
  [
    auth,
    [
      check("content", "commentForm is required").not().isEmpty(),
      check("videoId", "commentForm is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //console.log("result: ", req.statusCode);
    //  console.log(req);
    const errors = validationResult(req);
    //  console.log(res.statusCode, res.statusCode == "401");
    /*   if (res.statusCode === 401) {
      console.log("send");
      return res;
    } */
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, videoId } = req.body;
    console.log(req.body);
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newComment = new Comment({
        content,
        userName: user.userName,
        user: user._id,
        videoId,
        avatar: user.avatar,
      });

      let comment = await newComment.save();

      comment._doc.user = { _id: comment._doc.user };

      res.json(comment);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

//@route  PUT api/comment/
//@desc  update a Comment
//@access  private

router.put(
  "/update/:id",
  [
    auth,
    checkObjectId("id"),
    [check("content", "commentForm is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { content } = req.body;
    try {
      await Comment.findByIdAndUpdate(
        { _id: req.params.id },
        { content, edit: { status: true, date: Date.now() } },
        { new: true }
      )
        .populate("at", ["_id", "userName"])
        .populate("user", ["_id", "name"])
        .exec((error, data) => {
          if (error) return res.status(400).send(error);
          res.status(200).send(data);
        });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/comment/upvote/:id
// @desc     upvote a comment
// @access   Private
router.put("/upvote/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    let qurey = Comment.findById(req.params.id);
    const comment = await qurey;
    if (
      comment.upVotes.some(upvote => upvote.user.toString() === req.user.id)
    ) {
      comment.upVotes = comment.upVotes.filter(
        upVote => upVote.user.toString() !== req.user.id
      );
    } else {
      comment.upVotes.unshift({ user: req.user.id });
      comment.downVotes = comment.downVotes.filter(
        downVote => downVote.user.toString() !== req.user.id
      );
    }

    await comment.save();
    //populate at and user after effect
    qureyAt = await qurey.populate("at", ["_id", "userName"]);
    comment.at = qureyAt.at;
    qureyUser = await qurey.populate("user", ["_id", "name"]);
    comment.user = qureyUser.user;

    return res.json(comment);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/comment/downvote/:id
// @desc     downvote a comment
// @access   Private
router.put("/downvote/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    let qurey = Comment.findById(req.params.id);
    const comment = await qurey;
    if (
      comment.downVotes.some(
        downVote => downVote.user.toString() === req.user.id
      )
    ) {
      comment.downVotes = comment.downVotes.filter(
        downVote => downVote.user.toString() !== req.user.id
      );
    } else {
      comment.downVotes.unshift({ user: req.user.id });
      comment.upVotes = comment.upVotes.filter(
        upVote => upVote.user.toString() !== req.user.id
      );
    }
    await comment.save();
    //populate at and user after effect
    qureyAt = await qurey.populate("at", ["_id", "userName"]);
    comment.at = qureyAt.at;
    qureyUser = await qurey.populate("user", ["_id", "name"]);
    comment.user = qureyUser.user;

    return res.json(comment);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/comment/all/:id
// @desc     delete  comment by User
// @access   private

router.put("/delete/:id", [auth, checkObjectId("id")], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await Comment.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: { status: true, msg: "Deleted by User", date: Date.now() } },
      { new: true }
    )
      .populate("user", ["_id", "name"])
      .populate("at", ["_id", "userName"])
      .exec((error, data) => {
        if (error) return res.status(400).send(error);
        res.status(200).send(data);
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route     GET api/comment/all/:id
// @desc     get all comments of a specific video id
// @access   public

router.get("/all/:id", async (req, res) => {
  await Comment.find({ videoId: req.params.id })
    .populate("user", ["_id", "name"])
    .exec((error, data) => {
      if (error) return res.status(400).send(error);
      if (!data.length) {
        /*     const newComment = new Comment({}); */
        return res.status(200).send([{ videoId: req.params.id }]);
      }
      return res.status(200).send(data);
    });
});

//////////////Replys///////////////

//@route  POST api/comment/reply
//@desc  post a Reply to a Comment
//@access  private

router.post(
  "/reply",
  [
    auth,
    [
      check("content", "commentForm is required").not().isEmpty(),
      check("parentCommentId", "parentCommentId is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { content, parentCommentId, at } = req.body;
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newComment = new Comment({
        content,
        userName: user.userName,
        user: user._id,
        replyTo: parentCommentId,
        avatar: user.avatar,
        at,
      });

      let comment = await newComment.save();

      comment._doc.user = { _id: user._id };
      //populate the res at
      if (at) {
        const parentComment = await Comment.findById(at);
        comment._doc.at = { _id: at, userName: parentComment.userName };
      }

      res.json(comment);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// @route     GET api/comment/all/:id
// @desc     get all replys to a specific comment
// @access   public

router.get("/all/replies/:id", async (req, res) => {
  await Comment.find({ replyTo: req.params.id })
    .populate("at", ["_id", "userName"])
    .populate("user", ["_id", "name"])
    .exec((error, data) => {
      if (error) return res.status(400).send(error);
      res.status(200).send(data);
    });
});

module.exports = router;
