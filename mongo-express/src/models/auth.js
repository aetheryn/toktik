const mongoose = require("mongoose");

const followingDataSchema = new mongoose.Schema({
  username: { type: String },
  profilePicture: { type: String },
});

const followerDataSchema = new mongoose.Schema({
  username: { type: String },
  profilePicture: { type: String },
});

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
    following: [followingDataSchema],
    followers: [followerDataSchema],
    liked_videos: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
