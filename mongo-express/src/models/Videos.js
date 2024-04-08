const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  username: { type: String },
  content: { type: String },
  created_at: { type: Date, default: Date.now },
});

const VideosSchema = new mongoose.Schema({
  title: { type: String, minLength: 1, maxLength: 50 }, // title is caption
  url: { type: String },
  reported: { type: Boolean, default: false },
  likes: { type: Array }, // Array of strings
  comments: [CommentsSchema],
  created_at: { type: Date, require: true, default: Date.now },
  username: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 16,
  },
  fileName: { type: String, require: true }, // fileName is imageName
});

const Videos = mongoose.model("Videos", VideosSchema);
const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = { Videos, Comments };