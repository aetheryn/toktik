const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  username: { type: String, require: true },
  content: { type: String, require: true },
  created_at: { type: Date, require: true, default: Date.now },
});

const VideosSchema = new mongoose.Schema({
  title: { type: String, require: true, minLength: 1, maxLength: 50 },
  description: { type: String, require: true, minLength: 1, maxLength: 300 },
  duration: { type: Number, require: true }, // Number indicated in seconds
  url: { type: String, require: true },
  reported: { type: Boolean, require: true, default: false },
  likes: { type: Array, require: true }, // Array of strings
  comments: [CommentsSchema],
  id: { type: Number, require: true },
  created_at: { type: Date, require: true, default: Date.now },
  uploaded_by_user: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 16,
  },
});

const Videos = mongoose.model("Videos", VideosSchema);
const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = { Videos, Comments };
