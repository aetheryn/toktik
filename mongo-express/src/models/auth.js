const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    hash: { type: String, require: true },
    role: { type: String, default: "user" },
    profilePicture: { type: String },
    description: { type: String },
    following: { type: Array },
    following_count: { type: Number },
    followers: { type: Array },
    followers_count: { type: Number },
    liked_videos: { type: Array },
    like_count: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
