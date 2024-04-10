const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    receiver_id: { type: String, require: true },
    sender_id: { type: String, require: true },
    content: { type: String, require: true },
    read: { type: Boolean, require: true, default: false },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "messages" }
);

module.exports = mongoose.model("Messages", MessagesSchema);
