const Messages = require("../models/Messages");
const { getReceiverSocketId, io } = require("../socket/socket");

const seedMessages = async (req, res) => {
  try {
    await Messages.deleteMany({});
    await Messages.create([
      {
        receiver_id: "kentest",
        sender_id: "bryan1234",
        content: "[Seeded Message]",
      },
      {
        receiver_id: "gab",
        sender_id: "kentest",
        content: "[Seeded Message]",
      },
      {
        receiver_id: "bryan1234",
        sender_id: "gab",
        content: "[Seeded Message]",
      },
    ]);
    return res
      .status(200)
      .json({ status: "ok", msg: "Seeding messages successful." });
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Seeding messages failed." });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const allMessages = await Messages.find();

    const formattedMsgs = allMessages.map((message) => {
      return {
        ...message._doc,
        created_at: message._doc.created_at.toString().slice(0, 21),
      };
    });

    return res.status(200).json(formattedMsgs);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: "Error in getting all messages.",
    });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userMessages = await Messages.find().or([
      { receiver_id: req.params.user },
      { sender_id: req.params.user },
    ]);

    const formattedMsgs = userMessages.map((message) => {
      return {
        ...message._doc,
        created_at: message._doc.created_at.toString().slice(0, 21),
      };
    });

    return res.status(200).json(formattedMsgs);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in getting messages of ${req.params.user}.`,
    });
  }
};

const createUserMessages = async (req, res) => {
  try {
    const newMessage = {
      receiver_id: req.body.receiverId,
      sender_id: req.body.senderId,
      content: req.body.content,
    };

    const receiverSocketId = getReceiverSocketId(req.body.receiverId);
    console.log(receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage");
    }

    await Messages.create(newMessage);
    return res.status(200).json({
      status: "ok",
      msg: `New message added for ${req.body.senderId}.`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in creating messages for ${req.body.senderId}.`,
    });
  }
};

module.exports = {
  seedMessages,
  getAllMessages,
  getUserMessages,
  createUserMessages,
};
