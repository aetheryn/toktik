const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    hash: { type: String, require: true },
    role: { type: String, default: "user" },
    profilePicture: {
      type: String,
      default:
        "https://ideastest.org.uk/wp-content/uploads/2019/06/default-avatar-150x150.jpg",
    },
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
