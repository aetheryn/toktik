const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    hash: { type: String, require: true },
    role: { type: String, default: "user" },
    following: { type: Array },
    followers: { type: Array },
    likes: { type: Array },
  },
  { timestamps }
);

module.exports = mongoose.model("Auth", authSchema);
