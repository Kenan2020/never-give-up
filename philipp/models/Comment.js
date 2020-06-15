const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upVotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  downVotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  replyTo: {
    type: Schema.Types.ObjectId,
    ref: "comment",
  },
  at: {
    type: Schema.Types.ObjectId,
    ref: "comment",
  },
  deleted: {
    type: Object,
  },
  edit: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model("comment", commentSchema);
