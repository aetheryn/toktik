const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    hash: { type: String, require: true },
    role: { type: String, default: "user" },
    following: { type: String },
    following_count: { type: Number },
    followers: { type: String },
    followers_count: { type: Number },
    liked_videos: { type: String },
    like_count: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
